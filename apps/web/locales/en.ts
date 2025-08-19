// locales/en.ts
export default {
  common: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    error: 'Error',
    success: 'Success',
    backToHome: 'Back to home'
  },
  intervention: {
    title: 'Interventions',
    addButton: 'Add intervention',
    createTitle: 'Create a new intervention',
    updateTitle: 'Update',
    notFound: 'Intervention not found',
    confirmDelete: 'Are you sure you want to delete this intervention?',
    types: {
      EDUCATIONAL_SUPPORT: 'Educational support',
      SPEECH_THERAPY: 'Speech therapy',
      OCCUPATIONAL_THERAPY: 'Occupational therapy',
      PSYCHOLOGICAL_SUPPORT: 'Psychological support',
      PARENT_MEETING: 'Parent meeting',
      EVALUATION: 'Evaluation',
      FOLLOW_UP: 'Follow-up',
      OTHER: 'Other'
    },
    statuses: {
      PLANNED: 'Planned',
      IN_PROGRESS: 'In progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
      RESCHEDULED: 'Rescheduled',
      NO_SHOW: 'No show'
    },
    form: {
      fields: {
        title: 'Title',
        titlePlaceholder: 'ex: New intervention',
        type: 'Type',
        typePlaceholder: 'Select a type',
        startDate: 'Start date',
        endDate: 'End date',
        location: 'Location',
        locationPlaceholder: 'ex: School, clinic, home...',
        status: 'Status',
        description: 'Description',
        descriptionPlaceholder: 'Main goals, activities, observations...',
        notes: 'Notes',
        notesPlaceholder: 'Additional notes for professionals'
      },
      buttons: {
        goBack: 'Go back',
        saving: 'Saving...',
        create: 'Create intervention',
        update: 'Update intervention'
      }
    },
    list: {
      columns: {
        title: 'Title',
        type: 'Type',
        startDate: 'Start date',
        author: 'Author',
        createdAt: 'Created on',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      filters: {
        title: 'Title',
        type: 'Type',
        createdAt: 'Created on'
      }
    }
  },
  disorder: {
    title: 'Disorders',
    addButton: 'Add disorder',
    createTitle: 'Create a new disorder',
    updateTitle: 'Update',
    notFound: 'Disorder not found',
    confirmDelete: 'Are you sure you want to delete this disorder?',
    types: {
      ASD: 'Autism spectrum disorder',
      ADHD: 'Attention deficit hyperactivity disorder',
      ADD: 'Attention deficit disorder',
      TDA: 'TDA',
      DYSPRAXIA: 'Dyspraxia',
      DYSTHIMIA: 'Dysthymia',
      ANXIETY: 'Anxiety',
      OCD: 'Obsessive compulsive disorder',
      OTHER: 'Other'
    },
    form: {
      fields: {
        type: 'Type',
        typePlaceholder: 'Select a type',
        diagnosisDate: 'Diagnosis date',
        author: 'Author',
        description: 'Description',
        descriptionPlaceholder: 'Diagnosis details...'
      },
      buttons: {
        goBack: 'Go back',
        saving: 'Saving...',
        create: 'Create disorder',
        update: 'Update disorder'
      }
    },
    list: {
      columns: {
        description: 'Description',
        type: 'Type',
        diagnosisDate: 'Diagnosis date',
        author: 'Author',
        createdAt: 'Created on',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      filters: {
        description: 'Description',
        type: 'Type',
        createdAt: 'Created on'
      }
    }
  },
  goal: {
    title: 'Goals',
    addButton: 'Add goal',
    createTitle: 'Create a new goal',
    updateTitle: 'Update',
    notFound: 'Goal not found',
    confirmDelete: 'Are you sure you want to delete this goal?',
    types: {
      SHORT_TERM: 'Short term',
      LONG_TERM: 'Long term',
      MEDIUM_TERM: 'Medium term',
      OTHER: 'Other'
    },
    statuses: {
      PENDING: 'Pending',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
      OTHER: 'Other'
    },
    form: {
      fields: {
        title: 'Title',
        titlePlaceholder: 'e.g. Improve reading of CVC words',
        type: 'Type',
        typePlaceholder: 'Select a type',
        endDate: 'End date',
        status: 'Status',
        statusPlaceholder: 'Select a status',
        author: 'Author',
        description: 'Description',
        descriptionPlaceholder: 'Goal details...'
      },
      buttons: {
        goBack: 'Go back',
        saving: 'Saving...',
        create: 'Create goal',
        update: 'Update goal'
      }
    },
    list: {
      columns: {
        title: 'Title',
        type: 'Type',
        status: 'Status',
        endDate: 'End date',
        author: 'Author',
        createdAt: 'Created on',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      filters: {
        title: 'Title',
        type: 'Type',
        status: 'Status',
        createdAt: 'Created on'
      }
    }
  },
  auth: {
    layout: {
      title: 'MyDkeys',
      subtitle: 'Your Health, Secure and Accessible Anywhere.'
    }
  },
  login: {
    title: 'Login',
    subtitle: 'Please sign in to access your account.',
    emailPlaceholder: 'Your email address',
    passwordPlaceholder: 'Your password',
    submitButton: 'Sign in',
    submittingButton: 'Signing in...',
    noAccountText: "Don't have an account?",
    createAccountLink: 'Create an account',
    forgotPasswordText: 'Forgot your password?',
    resetPasswordLink: 'Reset my password',
    googleButton: 'Login with Google'
  },
  register: {
    title: 'Create an account',
    subtitle: 'Sign up to join our platform.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email address',
    passwordPlaceholder: 'Your password',
    confirmPasswordPlaceholder: 'Confirm your password',
    submitButton: 'Sign up',
    submittingButton: 'Signing up...',
    hasAccountText: 'Already have an account?',
    signInLink: 'Sign in'
  },
  forgotPassword: {
    title: 'Forgot your password?',
    subtitle: 'Please enter your email address below to receive a password reset link.',
    emailPlaceholder: 'e.g. john.doe@example.com',
    submitButton: 'Get reset link',
    successMessage: 'A reset link has been sent to your email address.'
  },
  resetPassword: {
    title: 'Reset your password',
    subtitle: 'Please check your email to reset your password.',
    errorMessage: 'There was a problem resetting your password.',
    submitButton: 'Reset Password',
    submittingButton: 'Resetting...',
    passwordMismatchError: 'Passwords do not match.',
    successMessage: 'Your password has been successfully reset.'
  },
  verifyEmail: {
    title: 'Email Verification',
    subtitle: 'Please check your email to activate your account.',
    sentMessage: 'A verification link has been sent to',
    accessInboxButton: 'Access my inbox'
  },
  users: {
    title: 'Users',
    columns: {
      avatar: 'Avatar',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      createdAt: 'Created on'
    },
    roles: {
      ADMIN: 'Administrator',
      USER: 'User'
    },
    filters: {
      name: 'Name',
      email: 'Email',
      role: 'Role',
      createdAt: 'Created on'
    }
  },
  sidebar: {
    sections: {
      general: 'GENERAL',
      healthData: 'HEALTH DATA',
      profile: 'PROFILE',
      admin: 'ADMIN',
      settings: 'SETTINGS'
    },
    items: {
      dashboard: 'Dashboard',
      documents: 'Documents',
      medicalData: 'Medical Data',
      members: 'Members',
      history: 'History',
      settings: 'Settings',
      users: 'Users',
      diagnosis: 'Diagnosis',
      conversations: 'Conversations',
      interventions: 'Interventions',
      disorders: 'Disorders'
    }
  },
  upload: {
    dragDrop: 'Drag and drop your file here, or click to select',
    loading: 'Loading...'
  },
  dashboard: {
    welcome: 'Welcome to {name}',
    medicalData: 'MEDICAL DATA',
    documents: 'DOCUMENTS',
    tableColumns: {
      title: 'Title',
      description: 'Description',
      type: 'Type',
      date: 'Date',
      createdOn: 'Created on'
    },
    labels: {
      viewAll: 'View all'
    },
    checklist: {
      title: 'Checklist',
      completed: 'completed',
      start: 'Start',
      documents: 'Upload your first document',
      interventions: 'Create your first intervention',
      disorders: 'Add your first disorder',
      goals: 'Create your first goal',
      members: 'Invite your first member'
    }
  },
  conversations: {
    list: {
      title: 'Conversations'
    },
    actions: {
      add: 'Add conversation'
    },
    create: {
      title: 'Create a conversation',
      placeholder: 'Conversation title',
      members: 'Select members',
      cta: 'Create'
    },
    participants: {
      title: 'Participants'
    },
    messages: {
      empty: 'No messages',
      placeholder: 'Write a message...',
      attachDocument: 'Quote a document',
      send: 'Send'
    },
    emptySelection: 'No conversation selected'
  },
  document: {
    title: 'Documents',
    addButton: 'Add document',
    createTitle: 'Create a new document',
    updateTitle: 'Update',
    notFound: 'Document not found',
    confirmDelete: 'Are you sure you want to delete this document?',
    downloadFile: 'Download file',
    fileType: 'File type:',
    fileSize: 'File size',
    openInNewTab: 'Open file in new tab',
    documentPreview: 'Document preview',
    loadingPreview: 'Loading preview...',
    previewError: 'Error loading preview',
    noFileData: 'No file data available',
    types: {
      EVALUATION_REPORT: 'Evaluation Report',
      THERAPY_REPORT: 'Therapy Report',
      EDUCATIONAL_PLAN: 'Educational Plan',
      PARENT_CONSENT: 'Parent Consent',
      SCHOOL_REPORT: 'School Report',
      MEETING_MINUTES: 'Meeting Minutes',
      REFERRAL_LETTER: 'Referral Letter',
      OBSERVATION_NOTE: 'Observation Note',
      PROGRESS_NOTE: 'Progress Note',
      EXTERNAL_DOCUMENT: 'External Document',
      ADMINISTRATIVE_DOCUMENT: 'Administrative Document',
      OTHER: 'Other'
    },
    form: {
      fields: {
        title: 'Title',
        titlePlaceholder: 'ex: New document',
        type: 'Type',
        typePlaceholder: 'Select a type',
        documentDate: "Document's date",
        author: 'Author',
        description: 'Description',
        descriptionPlaceholder: 'Document description...',
        file: 'File'
      },
      buttons: {
        goBack: 'Go Back',
        saving: 'Saving...',
        create: 'Create document',
        update: 'Update document'
      }
    },
    list: {
      columns: {
        title: 'Title',
        description: 'Description',
        type: 'Type',
        date: 'Date',
        author: 'Author',
        createdAt: 'Created on',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      filters: {
        title: 'Title',
        type: 'Type',
        createdAt: 'Created on'
      }
    }
  },
  member: {
    createTitle: 'Invite a new member',
    updateTitle: 'Edit member',
    loadingError: 'Error loading member',
    invitationTitle: "You have been invited to join {firstName} {lastName}'s profile",
    alreadyLoggedIn: 'You are already logged in as {name}.',
    createAccountMessage: 'Create an account with your email address to accept the invitation.',
    title: 'Members',
    addButton: 'Invite a member',
    relationTypes: {
      OWNER: 'Owner',
      FAMILY: 'Family',
      FRIEND: 'Friend',
      DOCTOR: 'Doctor',
      OTHER: 'Other'
    },
    roleTypes: {
      PROFESSIONAL: 'Professional',
      PARENT: 'Parent',
      CHILD: 'Child'
    },
    accessLevels: {
      NONE: 'No access',
      VIEW: 'View',
      EDIT: 'Edit',
      ADMIN: 'Admin'
    },
    form: {
      fields: {
        email: 'Email',
        title: 'Title',
        titlePlaceholder: 'ex: Dr., Ms., Mr., Coach...',
        firstName: 'First name',
        firstNamePlaceholder: 'ex: Jane',
        lastName: 'Last name',
        lastNamePlaceholder: 'ex: Doe',
        description: 'Description',
        descriptionPlaceholder: 'Role, relationship to the profile, notes... ',
        emailPlaceholder: 'example@email.com',
        relation: 'Relation',
        relationPlaceholder: 'Select a relation',
        disorderAccessLevel: 'Disorder access level',
        documentAccessLevel: 'Document access level',
        goalAccessLevel: 'Goal access level',
        interventionAccessLevel: 'Intervention access level',
        conversationAccessLevel: 'Conversation access level',
        profileAccessLevel: 'Profile access level',
        memberAccessLevel: 'Member access level',
        accessLevelPlaceholder: 'Select a level'
      },
      buttons: {
        showAdvanced: 'Show advanced options',
        hideAdvanced: 'Hide advanced options',
        cancel: 'Cancel',
        sending: 'Sending...',
        sendInvitation: 'Send invitation',
        save: 'Save member'
      }
    },
    invitation: {
      buttons: {
        accepting: 'Accepting...',
        accept: 'Accept Invitation',
        ignore: 'Ignore Invitation',
        createAccount: 'Create Account'
      }
    },
    list: {
      columns: {
        avatar: 'Avatar',
        name: 'Name',
        firstName: 'First Name',
        lastName: 'Last Name',
        user: 'User',
        relation: 'Relation',
        role: 'Role',
        addedOn: 'Added on',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      confirmDelete: 'Are you sure you want to delete this member?',
      pendingInvitation: 'Pending...',
      active: 'Active',
      filters: {
        relation: 'Relation',
        role: 'Role',
        user: 'User',
        createdAt: 'Created on'
      }
    }
  },
  profile: {
    createTitle: 'Add a new profile',
    updateTitle: 'Update',
    updateCurrentTitle: 'Update your profile',
    onboardingTitle: 'Welcome! Create a new profile.',
    notFound: 'Profile not found',
    subtitle:
      'Please provide the necessary information to personalize each profile for health monitoring and access management.',
    title: 'Profiles',
    addNewProfile: 'Add a new profile',
    manageProfiles: 'Manage profiles',
    logOut: 'Log out',
    selectProfile: 'Select',
    selecting: 'Selecting...',
    view: 'Select',
    edit: 'Edit',
    prefixes: {
      mr: 'Mr. ',
      mrs: 'Mrs. '
    },
    form: {
      fields: {
        firstName: 'First Name',
        firstNamePlaceholder: 'John',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Doe',
        email: 'Email Address',
        emailPlaceholder: 'example@mail.com',
        dateOfBirth: 'Date of Birth',
        dateOfBirthPlaceholder: 'YYYY-MM-DD',
        gender: 'Gender',
        genderPlaceholder: 'Select',
        address: 'Address',
        addressPlaceholder: 'Enter your address here',
        phoneNumber: 'Phone Number',
        phoneNumberPlaceholder: '+1 234 567 890',
        notes: 'Notes',
        notesPlaceholder: 'Type here...',
        description: 'Description',
        descriptionPlaceholder: 'Profile description... ',
        preferences: 'Preferences',
        preferencesPlaceholder: 'Strengths, interests, preferred strategies...',
        shortTermGoals: 'Short-term goals',
        shortTermGoalsPlaceholder: 'Ex: read CVC words, write 3 sentences...',
        longTermGoals: 'Long-term goals',
        longTermGoalsPlaceholder: 'Ex: reach grade-level reading by June...',
        mediumTermGoals: 'Medium-term goals',
        mediumTermGoalsPlaceholder: 'Ex: improve reading of CVC words by June...',
        schoolName: 'School name',
        schoolNamePlaceholder: 'Ex: Green Valley Elementary',
        schoolYear: 'School year',
        schoolYearPlaceholder: 'Ex: 2024–2025',
        teacherName: 'Teacher name',
        teacherNamePlaceholder: 'Ex: Mrs. Smith',
        supportPlan: 'Support plan',
        supportPlanPlaceholder: 'Interventions, frequency, coordination notes...',
        accommodations: 'Accommodations',
        accommodationsPlaceholder: 'Ex: extra time, small group, visual supports'
      },
      sections: {
        personalInfo: 'Personal information',
        education: 'Education',
        support: 'Support',
        goals: 'Goals'
      },
      genderOptions: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
        preferNotToSay: 'Prefer not to say'
      },
      buttons: {
        goBack: 'Go back',
        saving: 'Saving...',
        create: 'Create Profile',
        update: 'Update Profile'
      }
    },
    dangerZone: {
      title: 'Danger Zone',
      description: 'If you want to delete your profile, please click the button below.',
      deleteButton: 'Delete profile',
      confirmTitle: 'Confirm deletion',
      confirmDescription:
        'Are you sure you want to delete this profile? This action is irreversible and all data associated with this profile will be permanently lost.',
      cancelButton: 'Cancel',
      deleting: 'Deleting...',
      deleteForever: 'Delete permanently'
    }
  }
} as const;
