// Déclaration des variables 
    let myNav = document.querySelectorAll('nav a');
    console.log(myNav);

// Activation de la navigation 

    // Faire une boucle sur myNav (collection de liens)
    for( let item of myNav) {
        console.log(item); // item est un lien de la nav
    
        // Capter le click sur le lien, on écoute l'évènement
        item.addEventListener('click', (event)=> {

            // Bloquer le comportement naturel de la balise a
             // On a la possibilité de récupérer le click dans la fonction de call back avec (event)
             // C'est ce que l'on fait dans un premier temps, pour traiter la donnée avant de continuer 
            event.preventDefault();
    
           // Récupéer la valeur de l'attribut, le but c'est que quand on click sur le lien, ça charge le bon fichier html
           // La constante permet de récupérer l'attribut 
            const pageName = item.getAttribute('link-data')

            //Ajouter le contenu dans le DOM
            fetchHtmlData(pageName)
        });
    };

    // CREATION D'UNE FONCTION FETCH(big Arrow, ES6)
        const fetchHtmlData = (page = 'contacts') => { 

            // REQUETE ASYNCHRONE SUR UN FICHIER HTML (avec FETCH)
            // Prends le fichier accueil.html, attends qu'il soit chargé, puis ensuite mets le dans index.html

            // !!ATTENTION!! Pas de " ; " car toutes les fonctions s'enchainent, mais retour à la ligne, pour plus de clarté 
            // Dans ses paramètres, on met l'adresse vers mon fichier html, on part du fichier qui exécute le Js
            // CHARGEMENT 
                fetch(`./content/${page}.html`) 

            //TRAITEMENT
            //1er call back : analyse et traitement du fetch 
            //La réponse Raw est le résultat du chargement html, on traite la réponse avec une function call back 
                .then(rawReponse => {
                console.log(rawReponse)

                // Renvoyer la réponse au format texte
                    return rawReponse.text() // retour du fetch de façon brute (raw)
                })

            // MANIPULATION
            //2e call back : manipuler les données
                .then(textReponse =>{
                console.log(textReponse) // permet d'afficher le accueil.html dans la console 
                document.querySelector('main').innerHTML=textReponse //permet d'afficher le accueil.html dans la page html
                return page //Envoie le nom de la page dans le dernier then
                })
            
                .then(page => {
                    console.log(page)
                    //Vérifier le nom de la page active
                    if (page === 'contacts'){
                       submitForm()
                    }
                })

            //SI ERREUR, ON CAPTE L'ERREUR
            // On récupère une erreur dans la fonction catch(), puis on rajoute uen fonction de call back => {}
                .catch(error => {
                console.error(error)
                })
        }

    //GESTION DU FORMULAIRE
        const submitForm = ()=> {
        let myForm = document.querySelector('form');
        //Validation du formulaire
        //On récupère les placeholders des inputs du form dans contacts.html, pour les rendre unique et s'y référer
        let msgSubject = document.querySelector('[placeholder="Sujet"]'); 
        let msgEmail = document.querySelector('[placeholder="Email"]'); 
        let msgMessage = document.querySelector('[placeholder="Votre message"]'); 
        let messageList = document.querySelector('form + ul'); // Balise <ul> placée derrière la balise <form>
                        
        //Capter le submit du formulaire
            myForm.addEventListener('submit', (event) => {

            // Initier une variable pour la gestion des erreurs
                let formError=0;

            // Bloquer le comportement naturel de la balise
                event.preventDefault();

                // .value permet de récupérer la valeur du champ que l'on tape dans le champ
                // .length permet de connaitre la taille du mot, donc le nombre de lettres
                console.log(msgSubject.value.length); 

                //Le sujet est valide s'il contient au minimum 2 caractères 
                //Si la taille de la valeur de mon sujet est supérieur à 2, alors écrire 'sujet valide"
                if (msgSubject.value.length > 2){
                    console.log('Sujet valide')
                }else{
                    //Incrémenter formError de 1
                    formError++;
                    //Ajouter la class formError sur msgSubject 
                    msgSubject.classList.add('formError')
                }

                //L'email est valide s'il contient au minimum 5 caractères 
                if (msgEmail.value.length > 5){
                    console.log('Email valide')
                }else{
                     //Incrémenter formError de 1
                     formError++;
                     //Ajouter la class formError sur msgEmail
                     msgEmail.classList.add('formError')
                }

                //Le message est valide s'il contient au minimum 5 caractères 
                if (msgMessage.value.length > 5){
                    console.log('Message valide')
                }else{
                     //Incrémenter formError de 1
                     formError++;
                     //Ajouter la class formError sur msgMessage
                     msgMessage.classList.add('formError')
                }
                console.log(formError);

        //Validation finale du formulaire
            if(formError === 0){
                console.log('Le formulaire est validé');
                
                    // Afficher le message dans la liste
                    messageList.innerHTML += `
                        <li>
                            <h3>${msgSubject.value} <b>${msgEmail.value} </b></h3>
                            <p>${msgMessage.value}</p>
                        </li>
                    `

                    //Vider le formulaire
                    msgEmail.value =''
                    msgMessage.value =''
                    msgSubject.value=''
                }
            })

        //Supprimer les messages d'erreurs au focus
            msgSubject.addEventListener('focus', () => {
                msgSubject.classList.remove('formError')
            })
            msgEmail.addEventListener('focus', () => {
                msgEmail.classList.remove('formError')
            })
            msgMessage.addEventListener('focus', () => {
                msgMessage.classList.remove('formError')
            })
        };

    // Charger le contenu de la page d'accueil
        fetchHtmlData();

