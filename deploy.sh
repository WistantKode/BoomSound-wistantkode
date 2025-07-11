#!/bin/bash

# --- Couleurs pour une sortie plus lisible ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # Pas de couleur

# Script pour automatiser l'ajout, le commit et le push des modifications sur GitHub.

echo -e "${YELLOW} Démarrage de la synchronisation avec GitHub...${NC}"

# 1. Vérifier si un message de commit est fourni en argument
if [ -z "$1" ]; then
  # Si aucun message n'est fourni, utiliser un message par défaut.
  COMMIT_MESSAGE="Mise à jour des fichiers du projet"
else
  # Sinon, utiliser le message fourni.
  COMMIT_MESSAGE="$1"
fi

# 2. Exécuter le processus git
echo "   - Ajout des fichiers modifiés (git add .)"
git add .

echo "   - Création du commit avec le message : '${COMMIT_MESSAGE}'"
git commit -m "$COMMIT_MESSAGE"

echo "   - Envoi des modifications vers GitHub (git push)"
git push

echo -e "${GREEN} Synchronisation terminée avec succès !${NC}"