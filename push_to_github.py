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
        if process.stdout:
            print(process.stdout)
        if process.stderr:
            print(f"Erreur standard:\n{process.stderr}")
    except subprocess.CalledProcessError as e:
        # Si la commande échoue, affiche l'erreur et quitte.
        # If the command fails, print the error and exit.
        print(f" Erreur lors de l'exécution de la commande : '{e.cmd}'")
        print(f"Code de retour : {e.returncode}")
        print(f"Sortie : \n{e.stdout}")
        if e.stderr:
            print(f"Erreur : \n{e.stderr}")
        sys.exit(1)

def main():
    # 1. Demander le message de commit.
    # 1. Ask for the commit message.
    current_branch = subprocess.run("git rev-parse --abbrev-ref HEAD", shell=True, text=True, capture_output=True).stdout.strip()
    if current_branch == "HEAD":
        print("Impossible de déterminer la branche actuelle. Veuillez vérifier votre dépôt Git.")
        sys.exit(1)

    # 2. Demander la branche de destination si la branche actuelle est 'main'.
    # 2. Ask for the destination branch if the current branch is 'main'.
    if current_branch == "main":
        destination_branch = input("Entrez le nom de la branche de destination (laissez vide pour 'main') : ") or "main"
    commit_message = input("Entrez votre message de commit (ou laissez vide pour un message par défaut) : ")
    if not commit_message:
        commit_message = "Mise à jour automatique du projet via script Python"

    # 2. Exécuter les commandes Git.
    # 2. Execute Git commands.
    print("\n--- Ajout des fichiers au stage... ---")
    run_command("git add .")
    print(f"\n--- Création du commit avec le message : '{commit_message}' ---")
    run_command(f'git commit -m "{commit_message}"')
    print(f"\n--- Push vers la branche '{destination_branch}' de 'origin'... ---")
    run_command(f"git push origin {destination_branch}")
    print("\n Push terminé avec succès !")

if __name__ == "__main__":
    main()