#!/usr/bin/env python3

import subprocess
import sys

# Script pour automatiser le processus de push vers GitHub.
# Script to automate the process of pushing to GitHub.

def run_command(command):
    """
    Exécute une commande shell, affiche sa sortie et gère les erreurs.
    Runs a shell command, prints its output, and handles errors.
    """
    try:
        # Exécute la commande et capture la sortie.
        # Executes the command and captures the output.
        process = subprocess.run(command, check=True, shell=True, text=True, capture_output=True)
        print(process.stdout)
        if process.stderr:
            print(f"Erreur standard:\n{process.stderr}")
    except subprocess.CalledProcessError as e:
        # Si la commande échoue, affiche l'erreur et quitte.
        # If the command fails, print the error and exit.
        print(f" Erreur lors de l'exécution de la commande : '{e.cmd}'")
        print(f"Code de retour : {e.returncode}")
        print(f"Sortie : \n{e.stdout}")
        print(f"Erreur : \n{e.stderr}")
        sys.exit(1)

def main():
    # 1. Demander le message de commit.
    # 1. Ask for the commit message.
    commit_message = input("Entrez votre message de commit (ou laissez vide pour un message par défaut) : ")
    if not commit_message:
        commit_message = "Mise à jour automatique du projet via script Python"

    # 2. Exécuter les commandes Git.
    # 2. Execute Git commands.
    print("\n--- Ajout des fichiers au stage... ---")
    run_command("git add .")
    print(f"\n--- Création du commit avec le message : '{commit_message}' ---")
    run_command(f'git commit -m "{commit_message}"')
    print("\n--- Push vers la branche 'main' de 'origin'... ---")
    run_command("git push origin main")
    print("\n Push terminé avec succès !")

if __name__ == "__main__":
    main()