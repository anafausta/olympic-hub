import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { alunoService } from '../services/alunoService';
import { salaService } from '../services/salaService';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeOverlayTrilhaId, setActiveOverlayTrilhaId] = useState(null); // RF78

  const loadProfile = useCallback(async () => {
    try {
      const data = await alunoService.getProfile();
      const pos = await salaService.getStudentRankingPosition(data);
      setStudent({ ...data, posicaoRanking: pos });
    } catch (err) {
      console.error('Failed to load student profile', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const addXP = async (amount) => {
    const updatedXP = await alunoService.addXP(amount);
    const updatedStudent = student ? { ...student, xp: updatedXP } : await alunoService.getProfile();
    const pos = await salaService.getStudentRankingPosition(updatedStudent);
    setStudent((prev) => (prev ? { ...prev, xp: updatedXP, posicaoRanking: pos } : { ...updatedStudent, posicaoRanking: pos }));
    return updatedXP;
  };

  const recordSimulado = async (resultData) => {
    const updated = await alunoService.recordSimuladoResult(resultData);
    const pos = await salaService.getStudentRankingPosition(updated);
    setStudent({ ...updated, posicaoRanking: pos });
  };

  const toggleSavedArticle = async (artigoId) => {
    const updatedList = await alunoService.toggleSavedArticle(artigoId);
    setStudent((prev) => (prev ? { ...prev, artigosSalvosIds: updatedList } : prev));
    return updatedList;
  };

  const toggleSavedQuestion = async (questaoId) => {
    const updatedList = await alunoService.toggleSavedQuestion(questaoId);
    setStudent((prev) => (prev ? { ...prev, questoesSalvasIds: updatedList } : prev));
    return updatedList;
  };

  const updateAvatar = async (avatarId) => {
    const updated = await alunoService.updateAvatar(avatarId);
    setStudent(updated);
  };

  const updateEmail = async (email) => {
    const updated = await alunoService.updateEmail(email);
    setStudent(updated);
  };

  const toggleEmailNotifications = async (val) => {
    const updated = await alunoService.toggleEmailNotifications(val);
    setStudent(updated);
  };

  const deleteAccount = async () => {
    await alunoService.deleteAccount();
    setStudent(null);
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        loading,
        addXP,
        recordSimulado,
        toggleSavedArticle,
        toggleSavedQuestion,
        updateAvatar,
        updateEmail,
        toggleEmailNotifications,
        deleteAccount,
        activeOverlayTrilhaId,
        setActiveOverlayTrilhaId,
        refreshStudent: loadProfile
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
