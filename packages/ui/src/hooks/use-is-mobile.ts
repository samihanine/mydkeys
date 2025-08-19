'use client';

import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fonction pour vérifier si l'écran est mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérification initiale
    checkIsMobile();

    // Ajouter l'écouteur d'événement pour les changements de taille
    window.addEventListener('resize', checkIsMobile);

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};
