import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

// Exercice : Gérer des tâches dans TodoMVC avec Playwright
test('Ajout, complétion et suppression de tâches dans TodoMVC', async ({ page }) => {
  const todo = new TodoPage(page);

  // 1. Accède à l’application TodoMVC
  await todo.ouvrir();

  // 2. Ajoute les tâches dans le champ "What needs to be done?"
  await todo.ajouterTache("coder le module d'authentification");
  await todo.ajouterTache("Ecrire les tests unitaires");
  await todo.ajouterTache("Déployer sur github");

  // 3. Marque la tâche "Ecrire les tests unitaires" comme complétée
  await todo.completerTache("Ecrire les tests unitaires");

  // 4a. Vérifie que la tâche "Ecrire les tests unitaires" est visible
  await todo.verifierTacheVisible("Ecrire les tests unitaires");

  // 4b. Vérifie que le compteur affiche "2 items left"
  await todo.verifierCompteur("2 items left");

  // 5. Clique sur le bouton "Clear completed"
  await todo.supprimerTachesCompletes();

  // 6. Vérifie que la tâche "Ecrire les tests unitaires" n’est plus visible
  await todo.verifierTacheInvisible("Ecrire les tests unitaires");
});