// locales/en.ts
export default {
  common: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    error: 'Error',
    success: 'Success',
    backToHome: 'Back to home',
    cancel: 'Cancel',
    submit: 'Submit and continue',
    loading: 'Loading...',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    documents: 'Documents',
    assignments: 'Permissions',
    members: 'Members',
    groups: 'Roles'
  },
  group: {
    title: 'Roles',
    createTitle: 'Create a role',
    updateTitle: 'Update role',
    notFound: 'Role not found',
    form: {
      fields: {
        name: 'Name',
        namePlaceholder: 'e.g. Administrator, Teacher, Doctor...',
        description: 'Description',
        descriptionPlaceholder: 'Describe the role and its permissions...'
      }
    },
    list: {
      confirmDelete: 'Are you sure you want to delete this role?',
      columns: {
        name: 'Name',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      filters: {
        name: 'Name',
        createdAt: 'Created on'
      }
    }
  },
  assignment: {
    create: {
      title: 'Create an assignment',
      description: 'Assign a document to a role with specific permissions'
    },
    update: {
      title: 'Update assignment',
      description: 'Modify the assignment permissions'
    },
    form: {
      fields: {
        group: 'Role',
        groupPlaceholder: 'Select a role',
        document: 'Document',
        documentPlaceholder: 'Select a document',
        permission: 'Permission',
        permissionPlaceholder: 'Select a permission'
      }
    },
    list: {
      title: 'Assignments',
      add: 'Add assignment',
      columns: {
        groupId: 'Role',
        groupTemplateId: 'Role template',
        documentId: 'Document',
        documentTemplateId: 'Document template',
        permission: 'Permission',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      confirmDelete: 'Are you sure you want to delete this assignment?'
    },
    permissions: {
      VIEW: 'View',
      EDIT: 'Edit',
      COMMENT: 'Comment',
      APPROVE: 'Approve',
      SHARE: 'Share',
      MANAGE: 'Manage',
      OWNER: 'Owner'
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
      project: 'PROJECT',
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
      domains: 'Domains',
      documentTemplates: 'Document templates',
      groups: 'Roles'
    }
  },
  upload: {
    dragDrop: 'Drag and drop your file here, or click to select',
    loading: 'Loading...'
  },
  dashboard: {
    welcome: 'Welcome to the project {name}',
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
    subtitle: 'You can upload your documents here.',
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
    documentsValidated: 'documents validated',
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
        name: 'Name',
        title: 'Title',
        description: 'Description',
        type: 'Type',
        status: 'Status',
        date: 'Date',
        author: 'Author',
        createdAt: 'Created on',
        actions: 'Actions'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
        see: 'View',
        upload: 'Upload'
      },
      status: {
        missing: 'Missing',
        uploaded: 'Uploaded',
        approved: 'Approved',
        rejected: 'Rejected'
      },
      filters: {
        name: 'Name',
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
    invitationTitle: "You have been invited to join {firstName} {lastName}'s project",
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
        memberTemplate: 'Member template',
        memberTemplatePlaceholder: 'Select a template',
        displayName: 'Display name',
        displayNamePlaceholder: 'e.g. Dr. Jane Doe',
        email: 'Email',
        title: 'Title',
        titlePlaceholder: 'ex: Dr., Ms., Mr., Coach...',
        firstName: 'First name',
        firstNamePlaceholder: 'ex: Jane',
        lastName: 'Last name',
        lastNamePlaceholder: 'ex: Doe',
        description: 'Description',
        descriptionPlaceholder: 'Role, relationship to the project, notes... ',
        emailPlaceholder: 'example@email.com',
        relation: 'Relation',
        relationPlaceholder: 'Select a relation',
        disorderAccessLevel: 'Disorder access level',
        documentAccessLevel: 'Document access level',
        goalAccessLevel: 'Goal access level',
        interventionAccessLevel: 'Intervention access level',
        conversationAccessLevel: 'Conversation access level',
        projectAccessLevel: 'Project access level',
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
      alreadyAdded: 'Already added',
      active: 'Active',
      filters: {
        relation: 'Relation',
        role: 'Role',
        user: 'User',
        createdAt: 'Created on'
      }
    }
  },
  project: {
    createTitle: 'Add a new project',
    updateTitle: 'Update',
    updateCurrentTitle: 'Update your project',
    onboardingTitle: 'Welcome! Create a new project.',
    notFound: 'Project not found',
    subtitle:
      'Please provide the necessary information to personalize each project for health monitoring and access management.',
    title: 'Projects',
    addNewProject: 'Add a new project',
    manageProjects: 'Manage projects',
    logOut: 'Log out',
    selectProject: 'Select',
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
        domain: 'Domain',
        domainPlaceholder: 'Select a domain',
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
        descriptionPlaceholder: 'Project description... ',
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
        create: 'Create Project',
        update: 'Update Project'
      }
    },
    dangerZone: {
      title: 'Danger Zone',
      description: 'If you want to delete your project, please click the button below.',
      deleteButton: 'Delete project',
      confirmTitle: 'Confirm deletion',
      confirmDescription:
        'Are you sure you want to delete this project? This action is irreversible and all data associated with this project will be permanently lost.',
      cancelButton: 'Cancel',
      deleting: 'Deleting...',
      deleteForever: 'Delete permanently'
    }
  }
} as const;
