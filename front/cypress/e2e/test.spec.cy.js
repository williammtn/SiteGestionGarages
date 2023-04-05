describe('Navigation', () => {
    it('Visits the homepage and navigates to the calendar page', () => {
      cy.viewport(1920, 1080);
      cy.on('uncaught:exception', (err, runnable) => {
        // Vérifie si l'erreur est liée à cy.contains()
        if (err.message.includes('cy.contains()')) {
          // Affiche un message d'erreur personnalisé dans la console
          console.log('Erreur : le texte spécifié n\'a pas été trouvé sur la page. Ou ton code est cassé, ou il a pas accès aux cookies');
        }
      
        // Empêche l'erreur de se propager plus loin
        return false;
      });
      cy.visit('http://localhost:3000/accueil');
      cy.contains('Connexion').click({force: true});
      cy.url().should('include', '/connexion');
      cy.visit('http://localhost:3000/connexion');
      cy.get('#loginName').type('TestCalendar@Potatus.fr');
      cy.get('#loginPassword').type('123456');
      cy.contains('Sign in').type('Hello{enter}');
      cy.visit('http://localhost:3000/accueil');
      cy.contains('Calendrier').click({force:true});
      cy.url().should('include','/calendrier');
      cy.visit('http://localhost:3000/calendrier');
      cy.contains('Select...').click({force:true});
      cy.contains('Garage Joker').click({force:true}); 
      cy.contains('Réparation').click({force:true});
      cy.contains('Triangle').click({force:true});
      cy.get('#TestButtonCY').click({force:true});
      cy.contains('Valider').click({force:true});
      cy.visit('http://localhost:3000/calendrier');
      cy.contains('TestCalendar@Potatus.fr').click({force :true});
      cy.url().should('include', '/profil');
      cy.contains('Liste RDV').click({force :true});
      cy.contains('Garage Joker');
      cy.contains('supprimer le RDV').click({force:true});
      cy.contains('Liste des garages').click({force:true});
      cy.url().should('include', '/listegarages');
      cy.contains('Ajouter un créneau').click({force:true});
      cy.get('#TestCyDate').type('2023-05-04');
      cy.get('#TestCyDebutHeure').type('14:30');
      cy.get('#TestCyFinHeure').type('16:30');
      cy.contains('Ajouter').click({force:true});
      cy.contains('Déconnexion').click({force:true});
      cy.url().should('include', '/accueil');
      cy.contains('Accueil');
      cy.contains('Calendrier');
      cy.contains('Liste des garages');
      cy.contains('Connexion');
    });
  });

  
  

  