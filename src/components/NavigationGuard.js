import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationGuardContext = createContext();

const NavigationDialog = ({ isOpen, onConfirm, onCancel }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
              bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Unsaved Changes
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You have unsaved changes. Are you sure you want to leave?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                  dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                  transition-colors"
              >
                Leave anyway
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const NavigationGuardProvider = ({ children }) => {
  const [shouldBlock, setShouldBlock] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (shouldBlock) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    const handleLinkClick = (e) => {
      if (shouldBlock && !e.target.classList.contains('safe-navigation')) {
        const link = e.target.closest('a');
        if (link) {
          e.preventDefault();
          const path = link.getAttribute('href');
          if (path) {
            setPendingPath(path);
            setShowDialog(true);
          }
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleLinkClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [shouldBlock]);

  const handleConfirmNavigation = () => {
    setShouldBlock(false);
    setShowDialog(false);
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
  };

  const handleCancelNavigation = () => {
    setShowDialog(false);
    setPendingPath(null);
  };

  const value = {
    shouldBlock,
    setShouldBlock,
    pendingPath,
    setPendingPath,
    confirmNavigation: handleConfirmNavigation,
    blockNavigation: handleCancelNavigation
  };

  return (
    <NavigationGuardContext.Provider value={value}>
      {children}
      <NavigationDialog
        isOpen={showDialog}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
      />
    </NavigationGuardContext.Provider>
  );
};

export const useNavigationGuard = () => {
  const context = useContext(NavigationGuardContext);
  if (!context) {
    throw new Error('useNavigationGuard must be used within a NavigationGuardProvider');
  }
  return context;
};
