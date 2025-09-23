// locales/fr.ts
export default {
  common: {
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    error: 'Erreur',
    success: 'Succès',
    backToHome: "Retour à l'accueil",
    cancel: 'Annuler',
    submit: 'Soumettre et continuer',
    loading: 'Chargement...'
  },
  intervention: {
    title: 'Interventions',
    addButton: 'Ajouter une intervention',
    createTitle: 'Créer une nouvelle intervention',
    updateTitle: 'Mettre à jour',
    notFound: 'Intervention introuvable',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette intervention ?',
    types: {
      EDUCATIONAL_SUPPORT: 'Soutien éducatif',
      SPEECH_THERAPY: 'Orthophonie',
      OCCUPATIONAL_THERAPY: 'Ergothérapie',
      PSYCHOLOGICAL_SUPPORT: 'Soutien psychologique',
      PARENT_MEETING: 'Entretien parent',
      EVALUATION: 'Évaluation',
      FOLLOW_UP: 'Suivi',
      OTHER: 'Autre'
    },
    statuses: {
      PLANNED: 'Planifiée',
      IN_PROGRESS: 'En cours',
      COMPLETED: 'Terminée',
      CANCELLED: 'Annulée',
      RESCHEDULED: 'Replanifiée',
      NO_SHOW: 'Absent'
    },
    form: {
      fields: {
        title: 'Titre',
        titlePlaceholder: 'ex : Nouvelle intervention',
        type: 'Type',
        typePlaceholder: 'Sélectionner un type',
        startDate: 'Date de début',
        endDate: 'Date de fin',
        location: 'Lieu',
        locationPlaceholder: 'ex : École, cabinet, domicile...',
        status: 'Statut',
        description: 'Description',
        descriptionPlaceholder: 'Objectifs, activités, observations...',
        notes: 'Notes',
        notesPlaceholder: 'Notes complémentaires pour les professionnels'
      },
      buttons: {
        goBack: 'Retour',
        saving: 'Enregistrement...',
        create: "Créer l'intervention",
        update: "Mettre à jour l'intervention"
      }
    },
    list: {
      columns: {
        title: 'Titre',
        type: 'Type',
        startDate: 'Date de début',
        author: 'Auteur',
        createdAt: 'Créé le',
        actions: 'Actions'
      },
      actions: {
        edit: 'Modifier',
        delete: 'Supprimer'
      },
      filters: {
        title: 'Titre',
        type: 'Type',
        createdAt: 'Créé le'
      }
    }
  },
  disorder: {
    title: 'Troubles',
    addButton: 'Ajouter un trouble',
    createTitle: 'Créer un nouveau trouble',
    updateTitle: 'Mettre à jour',
    notFound: 'Trouble introuvable',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce trouble ?',
    types: {
      ASD: 'Trouble du spectre de l’autisme',
      ADHD: 'Trouble du déficit de l’attention avec hyperactivité',
      ADD: 'Trouble du déficit de l’attention',
      TDA: 'TDA',
      DYSPRAXIA: 'Dyspraxie',
      DYSTHIMIA: 'Dysthymie',
      ANXIETY: 'Anxiété',
      OCD: 'Trouble obsessionnel compulsif',
      OTHER: 'Autre'
    },
    form: {
      fields: {
        type: 'Type',
        typePlaceholder: 'Sélectionner un type',
        diagnosisDate: 'Date du diagnostic',
        author: 'Auteur',
        description: 'Description',
        descriptionPlaceholder: 'Détails du diagnostic...'
      },
      buttons: {
        goBack: 'Retour',
        saving: 'Enregistrement...',
        create: 'Créer le trouble',
        update: 'Mettre à jour le trouble'
      }
    },
    list: {
      columns: {
        description: 'Description',
        type: 'Type',
        diagnosisDate: 'Date du diagnostic',
        author: 'Auteur',
        createdAt: 'Créé le',
        actions: 'Actions'
      },
      actions: {
        edit: 'Modifier',
        delete: 'Supprimer'
      },
      filters: {
        description: 'Description',
        type: 'Type',
        createdAt: 'Créé le'
      }
    }
  },
  goal: {
    title: 'Objectifs',
    addButton: 'Ajouter un objectif',
    createTitle: 'Créer un nouvel objectif',
    updateTitle: 'Mettre à jour',
    notFound: 'Objectif introuvable',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet objectif ?',
    types: {
      SHORT_TERM: 'Court terme',
      LONG_TERM: 'Long terme',
      MEDIUM_TERM: 'Moyen terme',
      OTHER: 'Autre'
    },
    statuses: {
      PENDING: 'En attente',
      COMPLETED: 'Terminé',
      CANCELLED: 'Annulé',
      OTHER: 'Autre'
    },
    form: {
      fields: {
        title: 'Titre',
        titlePlaceholder: 'ex : Améliorer la lecture de mots CVC',
        type: 'Type',
        typePlaceholder: 'Sélectionner un type',
        endDate: 'Date de fin',
        status: 'Statut',
        statusPlaceholder: 'Sélectionner un statut',
        author: 'Auteur',
        description: 'Description',
        descriptionPlaceholder: "Détails de l'objectif..."
      },
      buttons: {
        goBack: 'Retour',
        saving: 'Enregistrement...',
        create: "Créer l'objectif",
        update: "Mettre à jour l'objectif"
      }
    },
    list: {
      columns: {
        title: 'Titre',
        type: 'Type',
        status: 'Statut',
        endDate: 'Date de fin',
        author: 'Auteur',
        createdAt: 'Créé le',
        actions: 'Actions'
      },
      actions: {
        edit: 'Modifier',
        delete: 'Supprimer'
      },
      filters: {
        title: 'Titre',
        type: 'Type',
        status: 'Statut',
        createdAt: 'Créé le'
      }
    }
  },
  auth: {
    layout: {
      title: 'MyDkeys',
      subtitle: 'Votre santé, sécurisée et accessible partout.'
    }
  },
  login: {
    title: 'Connexion',
    subtitle: 'Veuillez vous connecter pour accéder à votre compte.',
    emailPlaceholder: 'Votre adresse email',
    passwordPlaceholder: 'Votre mot de passe',
    submitButton: 'Se connecter',
    submittingButton: 'Connexion en cours...',
    noAccountText: "Vous n'avez pas de compte ?",
    createAccountLink: 'Créer un compte',
    forgotPasswordText: 'Mot de passe oublié ?',
    resetPasswordLink: 'Réinitialiser mon mot de passe',
    googleButton: 'Se connecter avec Google'
  },
  register: {
    title: 'Créer un compte',
    subtitle: 'Inscrivez-vous pour rejoindre notre plateforme.',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'Votre adresse email',
    passwordPlaceholder: 'Votre mot de passe',
    confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
    submitButton: "S'inscrire",
    submittingButton: 'Inscription en cours...',
    hasAccountText: 'Vous avez déjà un compte ?',
    signInLink: 'Se connecter'
  },
  forgotPassword: {
    title: 'Mot de passe oublié ?',
    subtitle: 'Veuillez saisir votre adresse email ci-dessous pour recevoir un lien de réinitialisation.',
    emailPlaceholder: 'ex. jean.dupont@exemple.com',
    submitButton: 'Obtenir le lien de réinitialisation',
    successMessage: 'Un lien de réinitialisation a été envoyé à votre adresse email.'
  },
  resetPassword: {
    title: 'Réinitialiser votre mot de passe',
    subtitle: 'Veuillez vérifier votre email pour réinitialiser votre mot de passe.',
    errorMessage: 'Il y a eu un problème lors de la réinitialisation de votre mot de passe.',
    submitButton: 'Réinitialiser le mot de passe',
    submittingButton: 'Réinitialisation...',
    passwordMismatchError: 'Les mots de passe ne correspondent pas.',
    successMessage: 'Votre mot de passe a été réinitialisé avec succès.'
  },
  verifyEmail: {
    title: "Vérification d'email",
    subtitle: 'Veuillez vérifier votre email pour activer votre compte.',
    sentMessage: 'Un lien de vérification a été envoyé à',
    accessInboxButton: 'Accéder à ma boîte mail'
  },
  users: {
    title: 'Utilisateurs',
    columns: {
      avatar: 'Avatar',
      name: 'Nom',
      email: 'Email',
      role: 'Rôle',
      createdAt: 'Créé le'
    },
    roles: {
      ADMIN: 'Administrateur',
      USER: 'Utilisateur'
    },
    filters: {
      name: 'Nom',
      email: 'Email',
      role: 'Rôle',
      createdAt: 'Créé le'
    }
  },
  sidebar: {
    sections: {
      general: 'GÉNÉRAL',
      healthData: 'DONNÉES MÉDICALES',
      project: 'PROJET',
      admin: 'ADMIN',
      settings: 'PARAMÈTRES'
    },
    items: {
      dashboard: 'Tableau de bord',
      documents: 'Documents',
      members: 'Membres',
      history: 'Historique',
      settings: 'Paramètres',
      users: 'Utilisateurs',
      domains: 'Domaines',
      documentTemplates: 'Modèles de document',
      memberTemplates: 'Modèles de membre',
      conversations: 'Messagerie',
      interventions: "Plan d'action",
      disorders: 'Troubles'
    }
  },
  upload: {
    dragDrop: 'Glissez-déposez votre fichier ici, ou cliquez pour sélectionner',
    loading: 'Chargement...'
  },
  dashboard: {
    welcome: 'Bienvenue sur le projet de {name}',
    medicalData: 'DONNÉES MÉDICALES',
    documents: 'DOCUMENTS',
    tableColumns: {
      title: 'Titre',
      description: 'Description',
      type: 'Type',
      date: 'Date',
      createdOn: 'Créé le'
    },
    labels: {
      viewAll: 'Voir tout'
    },
    checklist: {
      title: 'Checklist',
      completed: 'terminé',
      start: 'Commencer',
      documents: 'Téléversez votre premier document',
      interventions: 'Créez votre première intervention',
      disorders: "Ajoutez votre premier trouble d'apprentissage",
      goals: 'Créez votre premier objectif',
      members: 'Invitez votre premier membre'
    }
  },
  conversations: {
    list: {
      title: 'Conversations'
    },
    actions: {
      add: 'Ajouter une conversation'
    },
    create: {
      title: 'Créer une conversation',
      placeholder: 'Titre de la conversation',
      members: 'Sélectionner des membres',
      cta: 'Créer'
    },
    participants: {
      title: 'Participants'
    },
    messages: {
      empty: 'Aucun message',
      placeholder: 'Écrire un message...',
      attachDocument: 'Citer un document',
      send: 'Envoyer'
    },
    emptySelection: 'Aucune conversation sélectionnée'
  },
  document: {
    title: 'Documents',
    addButton: 'Ajouter un document',
    createTitle: 'Créer un nouveau document',
    updateTitle: 'Mettre à jour',
    notFound: 'Document non trouvé',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce document ?',
    downloadFile: 'Télécharger le fichier',
    fileType: 'Type de fichier :',
    fileSize: 'Taille du fichier',
    openInNewTab: 'Ouvrir le fichier dans un nouvel onglet',
    documentPreview: 'Aperçu du document',
    loadingPreview: "Chargement de l'aperçu...",
    previewError: "Erreur lors du chargement de l'aperçu",
    noFileData: 'Aucune donnée de fichier disponible',
    types: {
      EVALUATION_REPORT: "Rapport d'évaluation",
      THERAPY_REPORT: 'Rapport de thérapie',
      EDUCATIONAL_PLAN: 'Plan éducatif',
      PARENT_CONSENT: 'Consentement parental',
      SCHOOL_REPORT: 'Rapport scolaire',
      MEETING_MINUTES: 'Procès-verbal de réunion',
      REFERRAL_LETTER: 'Lettre de référence',
      OBSERVATION_NOTE: "Note d'observation",
      PROGRESS_NOTE: 'Note de progrès',
      EXTERNAL_DOCUMENT: 'Document externe',
      ADMINISTRATIVE_DOCUMENT: 'Document administratif',
      OTHER: 'Autre'
    },
    form: {
      fields: {
        title: 'Titre',
        titlePlaceholder: 'ex : Nouveau document',
        type: 'Type',
        typePlaceholder: 'Sélectionner un type',
        documentDate: 'Date du document',
        author: 'Auteur',
        description: 'Description',
        descriptionPlaceholder: 'Description du document...',
        file: 'Fichier'
      },
      buttons: {
        goBack: 'Retour',
        saving: 'Enregistrement...',
        create: 'Créer le document',
        update: 'Mettre à jour le document'
      }
    },
    list: {
      columns: {
        title: 'Titre',
        description: 'Description',
        type: 'Type',
        date: 'Date',
        author: 'Auteur',
        createdAt: 'Créé le',
        actions: 'Actions'
      },
      actions: {
        edit: 'Modifier',
        delete: 'Supprimer'
      },
      filters: {
        title: 'Titre',
        type: 'Type',
        createdAt: 'Créé le'
      }
    }
  },
  member: {
    createTitle: 'Inviter un nouveau membre',
    updateTitle: 'Modifier le membre',
    loadingError: 'Erreur lors du chargement du membre',
    invitationTitle: 'Vous avez été invité à rejoindre le projet de {firstName} {lastName}',
    alreadyLoggedIn: 'Vous êtes déjà connecté en tant que {name}.',
    createAccountMessage: "Créez un compte avec votre adresse email pour accepter l'invitation.",
    title: 'Membres',
    addButton: 'Inviter un membre',
    relationTypes: {
      OWNER: 'Propriétaire',
      FAMILY: 'Famille',
      FRIEND: 'Ami',
      DOCTOR: 'Médecin',
      OTHER: 'Autre'
    },
    roleTypes: {
      PROFESSIONAL: 'Professionnel',
      PARENT: 'Parent',
      CHILD: 'Enfant'
    },
    accessLevels: {
      NONE: 'Aucun accès',
      VIEW: 'Lecture',
      EDIT: 'Édition',
      ADMIN: 'Admin'
    },
    form: {
      fields: {
        email: 'Email',
        title: 'Titre',
        titlePlaceholder: 'ex : Dr., Mme, M., Coach...',
        firstName: 'Prénom',
        firstNamePlaceholder: 'ex : Jeanne',
        lastName: 'Nom',
        lastNamePlaceholder: 'ex : Dupont',
        description: 'Description',
        descriptionPlaceholder: 'Rôle, lien avec le projet, notes...',
        emailPlaceholder: 'exemple@email.com',
        relation: 'Relation',
        relationPlaceholder: 'Sélectionner une relation',
        disorderAccessLevel: "Niveau d'accès aux troubles",
        documentAccessLevel: "Niveau d'accès aux documents",
        goalAccessLevel: "Niveau d'accès aux objectifs",
        interventionAccessLevel: "Niveau d'accès aux interventions",
        conversationAccessLevel: "Niveau d'accès messagerie",
        projectAccessLevel: "Niveau d'accès projet",
        memberAccessLevel: "Niveau d'accès membres",
        accessLevelPlaceholder: 'Sélectionner un niveau'
      },
      buttons: {
        showAdvanced: 'Afficher les options avancées',
        hideAdvanced: 'Masquer les options avancées',
        cancel: 'Annuler',
        sending: 'Envoi...',
        sendInvitation: "Envoyer l'invitation",
        save: 'Enregistrer le membre'
      }
    },
    invitation: {
      buttons: {
        accepting: 'Acceptation...',
        accept: "Accepter l'invitation",
        ignore: "Ignorer l'invitation",
        createAccount: 'Créer un compte'
      }
    },
    list: {
      columns: {
        avatar: 'Avatar',
        name: 'Nom',
        firstName: 'Prénom',
        lastName: 'Nom',
        user: 'Utilisateur',
        relation: 'Relation',
        role: 'Rôle',
        addedOn: 'Ajouté le',
        actions: 'Actions'
      },
      actions: {
        edit: 'Modifier',
        delete: 'Supprimer'
      },
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce membre ?',
      pendingInvitation: 'En attente...',
      active: 'Actif',
      filters: {
        relation: 'Relation',
        role: 'Rôle',
        user: 'Utilisateur',
        createdAt: 'Créé le'
      }
    }
  },
  project: {
    createTitle: 'Ajouter un nouveau projet',
    updateTitle: 'Mettre à jour',
    updateCurrentTitle: 'Mettre à jour le projet',
    onboardingTitle: 'Bienvenue ! Créez un nouveau projet.',
    notFound: 'Projet non trouvé',
    subtitle:
      'Veuillez fournir les informations nécessaires pour personnaliser chaque projet pour le suivi de santé et la gestion des accès.',
    title: 'Projets',
    addNewProject: 'Ajouter un nouveau projet',
    manageProjects: 'Gérer les projets',
    logOut: 'Se déconnecter',
    selectProject: 'Sélectionner',
    selecting: 'Sélection...',
    view: 'Sélectionner',
    edit: 'Modifier',
    prefixes: {
      mr: 'M. ',
      mrs: 'Mme '
    },
    form: {
      fields: {
        firstName: 'Nom',
        firstNamePlaceholder: 'Projet de test',
        lastName: 'Prénom',
        lastNamePlaceholder: 'Jean',
        email: 'Adresse email',
        emailPlaceholder: 'exemple@mail.com',
        dateOfBirth: 'Date de naissance',
        dateOfBirthPlaceholder: 'AAAA-MM-JJ',
        gender: 'Sexe',
        genderPlaceholder: 'Sélectionner',
        address: 'Adresse',
        addressPlaceholder: 'Saisissez votre adresse ici',
        phoneNumber: 'Numéro de téléphone',
        phoneNumberPlaceholder: '+33 1 23 45 67 89',
        notes: 'Notes',
        notesPlaceholder: 'Tapez ici...',
        description: 'Description',
        descriptionPlaceholder: 'Description du projet...',
        preferences: 'Préférences',
        preferencesPlaceholder: 'Forces, intérêts, stratégies préférées...',
        shortTermGoals: 'Objectifs à court terme',
        shortTermGoalsPlaceholder: 'Ex : lire des mots CVC, écrire 3 phrases...',
        longTermGoals: 'Objectifs à long terme',
        longTermGoalsPlaceholder: 'Ex : atteindre le niveau de lecture d’ici juin...',
        mediumTermGoals: 'Objectifs à moyen terme',
        mediumTermGoalsPlaceholder: 'Ex : améliorer la lecture des mots CVC d’ici juin...',
        schoolName: 'Établissement scolaire',
        schoolNamePlaceholder: 'Ex : École des Tilleuls',
        schoolYear: 'Année scolaire',
        schoolYearPlaceholder: 'Ex : 2024–2025',
        teacherName: 'Nom de l’enseignant(e)',
        teacherNamePlaceholder: 'Ex : Mme Dupuis',
        supportPlan: 'Plan de soutien',
        supportPlanPlaceholder: 'Interventions, fréquence, notes de coordination...',
        accommodations: 'Aménagements',
        accommodationsPlaceholder: 'Ex : temps supplémentaire, petit groupe, supports visuels'
      },
      sections: {
        personalInfo: 'Informations personnelles',
        education: 'Scolarité',
        support: 'Soutien',
        goals: 'Objectifs'
      },
      genderOptions: {
        male: 'Masculin',
        female: 'Féminin',
        other: 'Autre',
        preferNotToSay: 'Préfère ne pas dire'
      },
      buttons: {
        goBack: 'Retour',
        saving: 'Enregistrement...',
        create: 'Créer le projet',
        update: 'Mettre à jour le projet'
      }
    },
    dangerZone: {
      title: 'Zone de danger',
      description: 'Si vous souhaitez supprimer le projet, veuillez cliquer sur le bouton ci-dessous.',
      deleteButton: 'Supprimer le projet',
      confirmTitle: 'Confirmer la suppression',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible et toutes les données associées à ce projet seront définitivement perdues.',
      cancelButton: 'Annuler',
      deleting: 'Suppression...',
      deleteForever: 'Supprimer définitivement'
    }
  }
} as const;
