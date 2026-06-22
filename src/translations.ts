export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navigation
    navHome: 'الرئيسية',
    navServices: 'الخدمات',
    navPortfolio: 'أعمالنا',
    navRequestDesign: 'طلب تصميم',
    navStudio: 'الاستوديو',
    navDashboard: 'لوحة التحكم',
    navAdmin: 'لوحة المسؤول',
    previewMode: 'وضع المعاينة:',
    guest: 'زائر',
    customer: 'عميل',
    admin: 'المسؤول',
    cart: 'السلة',
    items: 'عناصر',

    // Global
    currency: 'ج.م',
    studioOfflineTitle: 'الاستوديو معطل مؤقتاً',
    studioOfflineDesc: 'نعمل حالياً على تحديث استوديو التصميم الذاتي لتزويدكم بميزات أفضل. يرجى استخدام نموذج "طلب تصميم احترافي" أو رفع تصاميمكم الجاهزة مباشرة عبر صفحة الخدمات.',
    close: 'إغلاق',
    submit: 'إرسال',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    actions: 'الإجراءات',
    status: 'الحالة',
    price: 'السعر',
    details: 'التفاصيل',

    // Home Page
    heroTitle: 'صمم. اطبع. <span class="text-gradient">واستلم.</span>',
    heroDesc: 'صمم مطبوعاتك بنفسك في دقائق أو دع خبراءنا يصممونها لك — نقوم بالطباعة والتوصيل بجودة فائقة الجودة.',
    startDesigning: 'ابدأ التصميم ✦',
    requestDesignCTA: 'اطلب تصميماً خاصاً',
    howItWorks: 'كيف نعمل',
    howItWorksDesc: 'خطوات بسيطة ومضمونة من الفكرة الرقمية حتى الاستلام الفعلي.',
    step1Title: 'اختر وخصص',
    step1Desc: 'اختر نوع المنتج، وقم برفع شعارك أو حدد مواصفات المنتج المطلوبة.',
    step2Title: 'تسعير فوري',
    step2Desc: 'اختر المواد، التشطيبات والكميات. احصل على التكلفة بدقة فوراً.',
    step3Title: 'مراجعة الخبراء',
    step3Desc: 'قبل الطباعة، يراجع فريقنا الفني القياسات وجودة الصور لضمان النتيجة.',
    step4Title: 'توصيل فاخر',
    step4Desc: 'نطبع بأحدث الآلات ونشحن مباشرة إلى باب منزلك مع تتبع حي.',
    exploreServices: 'استكشف الخدمات الطباعية',
    exploreServicesDesc: 'اختر من تشكيلتنا الفاخرة وابدأ التخصيص فوراً.',
    expressShipping: '⚡ شحن سريع',
    expressShippingDesc: 'إنتاج وتوصيل خلال 48-72 ساعة',
    printAssurance: '🛡️ ضمان جودة الطباعة',
    printAssuranceDesc: 'مراجعة بشرية لكل طلب قبل الطباعة',
    carbonNeutral: '🌱 ورق صديق للبيئة',
    carbonNeutralDesc: 'ورق وقطن مستدام 100%',
    featuredCaseStudy: 'دراسة حالة مميزة',
    zenithTitle: 'هوية محمصة زينيث للقهوة المختصة',
    zenithDesc: 'احتاجت محمصة زينيث إلى عبوات كرتونية فاخرة تعكس نقاوة منتجاتهم. اعتمدنا تصميماً مبسطاً مع ختم نحاسي بارز على ورق كرافت طبيعي.',
    sliderHint: 'اسحب الشريط لمقارنة مسودة العميل مع النتيجة النهائية الفاخرة:',
    viewPortfolio: 'تصفح مكتبة أعمالنا',
    testimonialsTitle: 'ثقة العلامات الرائدة',
    testimonial1Text: '"طلبنا 500 بطاقة عمل قطنية فاخرة لإدارتنا. كان الحفر البارز والنواة الملونة مذهلة وموضع حديث الجميع."',
    testimonial1Author: 'ماركوس تشين',
    testimonial1Role: 'المؤسس الشريك، أبيكس للخدمات اللوجستية',
    testimonial2Text: '"استوديو التصميم كان سلساً جداً. نبهني النظام لعدم كفاية دقة شعارنا مما منع خطأ طباعي فادح. اهتمام رائع بالجودة."',
    testimonial2Author: 'إلينا روستوفا',
    testimonial2Role: 'مديرة التسويق، مؤتمر نوفاتك المطورين',

    // Services Page
    servicesTitle: 'الخدمات وتفاصيل التشطيب',
    servicesDesc: 'قارن بين الأسعار، الخامات والتشطيبات. ارفع ملفات التصميم الجاهزة أو اطلب تصميمنا الاحترافي.',
    startingAt: 'يبدأ من',
    selectMaterial: 'اختر نوع الخامة',
    selectFinish: 'اختر نوع التشطيب / طريقة الطباعة',
    quantity: 'الكمية',
    discountNote: 'خصومات الكمية: 50+ (8%)، 100+ (15%)، 500+ (25%)',
    uploadArtwork: 'رفع التصميم الجاهز',
    chooseFile: 'اختر ملفاً (PDF/PNG/SVG)',
    estimatedPricing: 'التسعير التقديري',
    designOnline: 'صمم أونلاين',
    uploadCheckout: 'رفع وإتمام الطلب',
    from: 'من',

    // Portfolio Page
    portfolioTitle: 'معرض أعمال الوكالة',
    portfolioDesc: 'استكشف دراسات الحالة الفعلية لعملائنا، مقيمين الانتقال من فكرة العميل حتى منتج مطبوع حقيقي.',
    clientBrief: '01 // موجز العميل وأهدافه',
    designProcess: '02 // عملية التصميم والتطوير',
    orderSimilar: 'اطلب منتجاً مشابهاً',
    outcomeSimulation: 'محاكاة المنتج الفعلي في الواقع',

    // Request Design Page
    requestDesignTitle: 'دع مصممينا يبدعون لك',
    requestDesignDesc: 'ليس لديك تصميم جاهز؟ اعمل مباشرة مع فريق التصميم في وكالتنا. نصمم ونراجع ونطبع تحت سقف واحد.',
    detailedBrief: 'تعبئة موجز مفصل',
    detailedBriefDesc: 'وضح فكرتك، الألوان المفضلة، الخطوط، وتوقعاتك العامة للتصميم.',
    mockupCollab: 'تعاون ومراجعة النماذج',
    mockupCollabDesc: 'يرفع لك المصمم المعين نماذج أولية لحسابك مباشرة. يمكنك طلب تعديلها أو الموافقة عليها فوراً.',
    blueprintRelease: 'إطلاق مخطط الإنتاج',
    blueprintReleaseDesc: 'فور موافقتك، تُرسل الملفات مباشرة إلى خطوط الطباعة وتتتبع المراحل من التغليف إلى الشحن.',
    createBriefTitle: 'إنشاء موجز التصميم',
    productCategory: 'نوع المنتج المطلوبة',
    describeIdea: 'صف فكرتك بالتفصيل',
    describeIdeaPlaceholder: 'يرجى كتابة تفاصيل الألوان، النصوص المطلوب إدراجها، وتوقعاتك العامة للتصميم...',
    referenceImages: 'شعار أو صور مرجعية للتصميم',
    refUploadPlaceholder: 'ارفع شعارات أو اسكتشات مرجعية (بحد أقصى 10 ميجا)',
    targetBudget: 'ميزانية التصميم التقديرية',
    deliveryUrgency: 'أهمية وتوقيت التوصيل',
    urgencyStandard: 'عادي (5-7 أيام)',
    urgencyRush: '⚡ عاجل (2-3 أيام)',
    urgencyExpress: '✦ فوري (24 ساعة)',
    submitBrief: 'إرسال الموجز للوكالة',
    briefSubmitted: 'تم إرسال الموجز بنجاح',
    briefSubmittedDesc: 'تم إرسال موجز التصميم الخاص بك بنجاح إلى الإدارة. سيقوم كبير المصممين بمراجعته ورفع نموذج أولي في حسابك خلال 24 ساعة.',
    trackDashboard: 'تتبع في لوحة التحكم',
    backHome: 'العودة للرئيسية',

    // Checkout Page
    checkoutSummary: 'ملخص الطلب والدفع',
    color: 'اللون:',
    material: 'الخامة:',
    finish: 'التشطيب:',
    artwork: 'ملف التصميم:',
    shippingAddressTitle: 'عنوان الشحن والتسليم',
    contactName: 'اسم المستلم',
    contactEmail: 'البريد الإلكتروني للاتصال',
    destinationAddress: 'عنوان التوصيل التفصيلي',
    secureCheckout: 'الدفع الآمن',
    cardNumber: 'رقم بطاقة الائتمان',
    expirationDate: 'تاريخ الانتهاء',
    cvv: 'رمز التحقق CVV',
    subtotal: 'المجموع الفرعي:',
    free: 'مجاناً',
    reviewNotice: '⚠️ مراجعة ما قبل الإنتاج: يقوم فريقنا الفني بمراجعة جودة التصميم والقياسات قبل البدء بالطباعة.',
    simulatePayment: 'محاكاة الدفع بمبلغ',
    paymentApproved: 'تمت الموافقة على الدفع',
    paymentApprovedDesc: 'شكراً لطلبك! رقم الفاتورة المرجعي الخاص بك هو:',
    trackOrderProgress: 'تتبع مراحل الإنتاج',

    // Customer Dashboard
    orderHistory: 'سجل الطلبات',
    savedDesigns: 'التصاميم المحفوظة',
    savedDesignsDesc: 'قوالب التصميم المخصصة التي قمت بحفظها في الاستوديو.',
    noSavedDesigns: 'لم تقم بحفظ أي قوالب تصميم بعد.',
    openStudio: 'افتح استوديو التصميم',
    reorder: 'إعادة طلب',
    orderRef: 'رقم الطلب',
    datePlaced: 'تاريخ الطلب',
    productItem: 'المنتج',
    qtyConfig: 'الكمية',
    finalCost: 'التكلفة الإجمالية',
    productionStatus: 'حالة الإنتاج',
    detailsAction: 'التفاصيل',
    timelineTitle: 'متابعة مراحل الإنتاج للطلب',
    specificationsTitle: 'المواصفات المختارة',
    proofingTitle: 'مراجعة واعتماد مسودة التصميم',
    proofingDescQueue: '🕒 في انتظار المراجعة الفنية: يقوم الفنيون لدينا بفحص دقة الصور وحجم منطقة الأمان والنزيف. سنقوم برفع مسودة أولية لاعتمادك خلال 24 ساعة.',
    proofingDescProof: '🎨 تم رفع مسودة التصميم بواسطة المصمم: يرجى مراجعة المواصفات والنموذج أدناه. فور موافقتك سيبدأ الإنتاج فوراً.',
    revisionHistoryTitle: 'سجل التعديلات المتبادلة:',
    approveProofBtn: 'اعتماد وموافقة على الطباعة',
    requestRevisionBtn: 'طلب تعديل على التصميم',
    explainRevisionPlaceholder: 'اكتب التعديلات المطلوبة بوضوح (مثال: تكبير الشعار في المنتصف، تغيير لون النص)...',
    submitFeedback: 'إرسال ملاحظات التعديل',
    proofApprovedSuccess: 'تم اعتماد المسودة بنجاح! تم نقل الطلب إلى طابور الطباعة الفورية.',
    revisionSubmittedSuccess: 'تم إرسال ملاحظات التعديل إلى فريق التصميم وسيتم تحديث المسودة قريباً.',
    printReleaseSuccess: 'تم اعتماد هذا الملف مسبقاً وإطلاقه للطباعة، لا يمكن طلب تعديلات إضافية.',

    // Admin Dashboard
    adminConsole: 'لوحة التحكم وإدارة المصنع',
    allOrdersTab: 'كل طلبات الطباعة',
    designBriefsTab: 'طلبات التصميم الفنية',
    catalogRulesTab: 'تسعير المنتجات',
    addCaseStudyTab: 'إضافة دراسة حالة',
    ordersConsoleTitle: 'لوحة إدارة طلبات الطباعة',
    refreshList: '🔄 تحديث القائمة',
    refId: 'الرقم',
    clientName: 'اسم العميل',
    finishingSpecs: 'المواصفات الفنية',
    manageWorkflow: 'إدارة الطلب والإنتاج',
    intakeBriefsTitle: 'طلبات التصميم الواردة للوكالة',
    noBriefs: 'لا توجد طلبات تصميم واردة حالياً.',
    budgetRange: 'نطاق الميزانية',
    urgency: 'الأهمية',
    catalogTitle: 'تعديل أسعار الكتالوج ديناميكياً',
    catalogDesc: 'يمكنك تعديل السعر الأساسي للمنتجات هنا. سيتم تطبيق التحديث فوراً في صفحة الخدمات والتسعير التلقائي.',
    baseCost: 'السعر الأساسي:',
    saveRule: 'حفظ السعر',
    releaseCaseStudy: 'نشر دراسة حالة جديدة لبطاقة الأعمال والمعارض',
    releaseCaseStudyDesc: 'ارفع تفاصيل المشروع وصور المقارنة لعرضها في معرض أعمالنا العام.',
    projectTitle: 'عنوان المشروع',
    clientNameLabel: 'اسم العميل/الشركة',
    categoryBadge: 'فئة المشروع (مثال: عبوات، ملابس)',
    projectBrief: 'موجز المشروع والأهداف',
    projectProcess: 'طريقة العمل وخطوات الإنتاج والتشطيب المطبقة',
    publishProject: 'نشر دراسة الحالة في المعرض',
    adminActionPanel: 'لوحة إدارة مسار الإنتاج والملفات',
    productionPhaseProgress: 'تحديث مرحلة الإنتاج الحالية للطلب',
    requestArtworkRevision: 'طلب تعديل التصميم من العميل (إرسال للعميل)',
    revisionPlaceholderAdmin: 'اشرح للعميل سبب رفض الملف (مثال: دقة اللوجو منخفضة، تداخل النصوص مع خطوط النزيف)...',
    rejectLayoutBtn: 'رفض الملف وطلب تعديل من العميل',
    briefEvaluation: 'تقييم موجز التصميم وإرسال مسودة أولية للعميل',
    clientIdentity: 'معلومات العميل والطلب:',
    briefDetailsText: 'الموجز والتفاصيل المطلوبة:',
    designerProofSim: 'رابط صورة مسودة التصميم المقترحة للعميل (محاكاة)',
    uploadProofBtn: 'رفع المسودة وإرسالها لاعتماد العميل',
    editOrderDetails: 'تعديل مواصفات وتكلفة الطلب (مسؤول كامل)',
    editProductDetails: 'إضافة/تعديل مواصفات منتج بالكتالوج',
    editProductBtn: 'تعديل مواصفات المنتج',
    addProductBtn: 'إضافة منتج جديد للكتالوج',
    productNameAr: 'اسم المنتج (بالعربية)',
    productNameEn: 'اسم المنتج (بالإنجليزية)',
    productDescAr: 'وصف المنتج (بالعربية)',
    productDescEn: 'وصف المنتج (بالإنجليزية)',
    productBasePrice: 'السعر الأساسي (ج.م)',
    productColorsComma: 'الألوان المتاحة (أكواد سداسية مفصولة بفواصل، مثل: #FFF,#000)',
    productMaterialsAr: 'المواد المتاحة (الاسم بالعربية:معامل التكلفة، مفصولة بفواصل، مثل: ورق قطني:1.2)',
    productFinishesAr: 'التشطيبات المتاحة (الاسم بالعربية:تكلفة إضافية، مفصولة بفواصل، مثل: ختم ذهبي:3.5)',
    orderFormTitle: 'تعديل تفاصيل الطلب #'
  },

  en: {
    // Navigation
    navHome: 'Home',
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navRequestDesign: 'Request Design',
    navStudio: 'Studio Editor',
    navDashboard: 'My Dashboard',
    navAdmin: 'Admin Panel',
    previewMode: 'Preview Mode:',
    guest: 'Guest User',
    customer: 'Customer',
    admin: 'Administrator',
    cart: 'Cart',
    items: 'items',

    // Global
    currency: 'EGP',
    studioOfflineTitle: 'Studio Editor Offline',
    studioOfflineDesc: 'We are currently upgrading the self-service design editor for an improved workflow. Please request a professional design brief or upload your ready-to-print artwork directly.',
    close: 'Close',
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    actions: 'Actions',
    status: 'Status',
    price: 'Price',
    details: 'Details',

    // Home Page
    heroTitle: 'Design. Print. <span class="text-gradient">Deliver.</span>',
    heroDesc: 'Create your design in minutes or let our professionals design it for you — we print and deliver with premium quality.',
    startDesigning: 'Start Designing ✦',
    requestDesignCTA: 'Request Custom Design',
    howItWorks: 'How It Works',
    howItWorksDesc: 'A simplified, secure workflow from digital idea to physical delivery.',
    step1Title: 'Select & Customize',
    step1Desc: 'Choose a product, write ideas or configure your desired dimensions and files.',
    step2Title: 'Instant Estimate',
    step2Desc: 'Configure finishes, volume, and materials. Receive precise cost feedback instantly.',
    step3Title: 'Expert Preflight Review',
    step3Desc: 'Before printing, our design team tests your file layout and margins. No printing failures.',
    step4Title: 'Premium Delivery',
    step4Desc: 'We print using industry-leading machinery and ship directly to your storefront.',
    exploreServices: 'Explore Print Services',
    exploreServicesDesc: 'Choose from our premium selection of curated products and begin customizing.',
    expressShipping: '⚡ Express Shipping',
    expressShippingDesc: 'Production + delivery in 48-72h',
    printAssurance: '🛡️ Premium Print Assurance',
    printAssuranceDesc: 'Every file reviewed by printing experts',
    carbonNeutral: '🌱 Carbon-Neutral Stock',
    carbonNeutralDesc: '100% sustainable paper and cotton',
    featuredCaseStudy: 'Featured Case Study',
    zenithTitle: 'Zenith Specialty Coffee Roasters Branding',
    zenithDesc: 'Zenith needed corporate packaging that felt as clean and pure as their single-origin coffee. We built a visual identity relying on copper hot stamping on natural brown kraft stock.',
    sliderHint: 'Drag the slider to compare client sketch briefs with finalized premium physical items:',
    viewPortfolio: 'View Case Studies Library',
    testimonialsTitle: 'Loved by Leading Brands',
    testimonial1Text: '"We ordered 500 custom linen cards for our executive team. The blind debossing was pristine and the thick layered edge is a major talking point."',
    testimonial1Author: 'Marcus Chen',
    testimonial1Role: 'Co-Founder, Apex Logistics',
    testimonial2Text: '"The web studio editor was super smooth. I was warning-flagged for a low-res logo asset, which prevented a printing mistake. Excellent attention to quality."',
    testimonial2Author: 'Elena Rostova',
    testimonial2Role: 'Marketing Lead, NovaTech DevConf',

    // Services Page
    servicesTitle: 'Print & Custom Finishes',
    servicesDesc: 'Compare pricing, materials, and configurations. Upload completed artwork files directly or request our custom design services.',
    startingAt: 'Starting at',
    selectMaterial: 'Select Material',
    selectFinish: 'Select Finish / Print Style',
    quantity: 'Quantity',
    discountNote: 'Discounts: 50+ (8%), 100+ (15%), 500+ (25%)',
    uploadArtwork: 'Upload Finished Artwork',
    chooseFile: 'Choose File (PDF/PNG/SVG)',
    estimatedPricing: 'Estimated Pricing',
    designOnline: 'Design Online',
    uploadCheckout: 'Upload & Checkout',
    from: 'from',

    // Portfolio Page
    portfolioTitle: 'Creative Portfolio',
    portfolioDesc: 'Explore Case Studies from real clients, evaluating the flow from their primary draft ideas to production printing runs.',
    clientBrief: '01 // Client Brief & Objectives',
    designProcess: '02 // Design Development Process',
    orderSimilar: 'Order Similar Print Services',
    outcomeSimulation: 'Simulated Physical Outcome',

    // Request Design Page
    requestDesignTitle: 'Let Our Designers Craft Your Print Asset',
    requestDesignDesc: 'Don\'t have print-ready artwork? Work directly with our design agency team. We design, review, and print under one roof.',
    detailedBrief: 'Detailed Briefing Intake',
    detailedBriefDesc: 'Outline your ideas, branding references, colors, font guides, and timeline preferences.',
    mockupCollab: 'Mockup Collaboration',
    mockupCollabDesc: 'Your assigned designer uploads proof concepts directly to your account. Request revisions or approve.',
    blueprintRelease: 'Production Blueprint Release',
    blueprintReleaseDesc: 'Once approved, files are sent to our printing queue. Track production steps live.',
    createBriefTitle: 'Create Design Brief',
    productCategory: 'Product Category',
    describeIdea: 'Describe Your Idea',
    describeIdeaPlaceholder: 'Please detail your color desires, text components, logos, and general layout expectations...',
    referenceImages: 'Reference Images / Logos',
    refUploadPlaceholder: 'Upload sketches, logos, details (Max 10MB)',
    targetBudget: 'Target Budget Range',
    deliveryUrgency: 'Delivery Urgency',
    urgencyStandard: 'Standard (5-7d)',
    urgencyRush: '⚡ Rush (2-3d)',
    urgencyExpress: '✦ Express (24h)',
    submitBrief: 'Submit Brief to Agency',
    briefSubmitted: 'Brief Submitted',
    briefSubmittedDesc: 'Your design brief has been securely transmitted. A professional lead designer will review it and upload a mockup proof within 24 hours.',
    trackDashboard: 'Track on Dashboard',
    backHome: 'Back to Home',

    // Checkout Page
    checkoutSummary: 'Checkout Summary',
    color: 'Color:',
    material: 'Material:',
    finish: 'Finish:',
    artwork: 'Artwork:',
    shippingAddressTitle: 'Shipping Address',
    contactName: 'Contact Name',
    contactEmail: 'Contact Email',
    destinationAddress: 'Delivery Destination Address',
    secureCheckout: 'Secure Checkout',
    cardNumber: 'Card Number',
    expirationDate: 'Expiration Date',
    cvv: 'Security CVV',
    subtotal: 'Subtotal:',
    free: 'FREE',
    reviewNotice: '⚠️ Preflight Review: Our admin design team is evaluating your canvas layout & margins before printing release.',
    simulatePayment: 'Simulate Payment of',
    paymentApproved: 'Payment Approved',
    paymentApprovedDesc: 'Thank you for your order! Your invoice reference is:',
    trackOrderProgress: 'Track Order Progress',

    // Customer Dashboard
    orderHistory: 'Order History',
    savedDesigns: 'Saved Canvas Designs',
    savedDesignsDesc: 'Custom canvas templates you saved in the design studio.',
    noSavedDesigns: 'You haven\'t saved any canvas templates yet.',
    openStudio: 'Open Studio Editor',
    reorder: 'Reorder',
    orderRef: 'Order Ref',
    datePlaced: 'Date Placed',
    productItem: 'Product Item',
    qtyConfig: 'Qty Config',
    finalCost: 'Final Cost',
    productionStatus: 'Production Status',
    detailsAction: 'Details',
    timelineTitle: 'Live Production Tracking',
    specificationsTitle: 'Selected Specifications',
    proofingTitle: 'Preflight Proofing & Revision',
    proofingDescQueue: '🕒 File Verification Queue: Our prepress technicians are testing your vector paths, coordinates, bleed boundaries, and resolution ratings. Proof within 24 hours.',
    proofingDescProof: '🎨 Proof Uploaded: A designer has revised your specifications. Please review this outline. Once you approve, printing begins.',
    revisionHistoryTitle: 'Revision History Logs:',
    approveProofBtn: 'Approve Proof',
    requestRevisionBtn: 'Request Revision',
    explainRevisionPlaceholder: 'Explain required adjustments (e.g. Center logo larger, change text color)...',
    submitFeedback: 'Submit Feedback',
    proofApprovedSuccess: 'Mock proof approved successfully! The order is now queued for print release.',
    revisionSubmittedSuccess: 'Your revision request has been saved and sent back to the design team.',
    printReleaseSuccess: 'This file setup has been approved by the customer and released for printing.',

    // Admin Dashboard
    adminConsole: 'Admin Control Console',
    allOrdersTab: 'All Orders',
    designBriefsTab: 'Design Briefs',
    catalogRulesTab: 'Catalog Pricing',
    addCaseStudyTab: 'Add Case Study',
    ordersConsoleTitle: 'Printing Orders Console',
    refreshList: '🔄 Refresh List',
    refId: 'Ref ID',
    clientName: 'Client Name',
    finishingSpecs: 'Finishing Specs',
    manageWorkflow: 'Manage Workflow',
    intakeBriefsTitle: 'Custom Agency Briefs',
    noBriefs: 'No professional design requests have been filed yet.',
    budgetRange: 'Budget Range',
    urgency: 'Urgency',
    catalogTitle: 'Dynamic Catalog Pricing Rules',
    catalogDesc: 'Adjust base catalog pricing tiers dynamically. Adjustments are instantly calculated during user design customization sessions.',
    baseCost: 'Base cost:',
    saveRule: 'Save Rule',
    releaseCaseStudy: 'Release Agency Case Study',
    releaseCaseStudyDesc: 'Upload high-end visuals and outlining descriptions of completed print operations.',
    projectTitle: 'Project Title',
    clientNameLabel: 'Client Name',
    categoryBadge: 'Category Badge',
    projectBrief: 'Client Brief',
    projectProcess: 'Design Process',
    publishProject: 'Publish Case Study Project',
    adminActionPanel: 'Admin Action Panel',
    productionPhaseProgress: 'Production Phase Progress',
    requestArtworkRevision: 'Request Artwork Revision (Optional)',
    revisionPlaceholderAdmin: 'Explain why the design isn\'t print-ready (e.g. Center logo larger, low resolution, margin issues)...',
    rejectLayoutBtn: 'Reject Layout & Ask Revision',
    briefEvaluation: 'Brief Intake Evaluation',
    clientIdentity: 'Client Identity:',
    briefDetailsText: 'Brief Details:',
    designerProofSim: 'Designer Proof Mockup URL (Simulation)',
    uploadProofBtn: 'Upload Mockup & Request Client Approval',
    editOrderDetails: 'Edit Order Specifications (Full Admin CRUD)',
    editProductDetails: 'Add/Edit Catalog Product Specifications',
    editProductBtn: 'Edit Product Details',
    addProductBtn: 'Add Product to Catalog',
    productNameAr: 'Product Name (Arabic)',
    productNameEn: 'Product Name (English)',
    productDescAr: 'Product Description (Arabic)',
    productDescEn: 'Product Description (English)',
    productBasePrice: 'Base Price (EGP)',
    productColorsComma: 'Available Colors (Comma separated hex codes, e.g. #FFF,#000)',
    productMaterialsAr: 'Materials (Name:multiplier comma separated, e.g. Cotton Linen:1.2)',
    productFinishesAr: 'Finishes (Name:addedCost comma separated, e.g. Foil Emboss:0.6)',
    orderFormTitle: 'Edit Details for Order #'
  }
};

export const getLocalizedProduct = (
  product: { name: string; description: string; materials?: any[]; finishes?: any[] },
  lang: 'ar' | 'en'
) => {
  const name = product.name;
  const description = product.description;

  const translateText = (text: string) => {
    if (!text) return '';
    const parts = text.split('|');
    if (parts.length > 1) {
      return lang === 'ar' ? parts[0].trim() : parts[1].trim();
    }
    
    if (lang === 'ar') {
      if (text === 'Premium Crewneck Tee') return 'تيشيرت كلاسيكي فاخر';
      if (text === 'Heavyweight 240GSM organic cotton. Boxy fit, drop shoulders, with high-density printing.') 
        return 'قطن عضوي ثقيل 240 جرام. قصّة مريحة، أكتاف منسدلة، مع طباعة عالية الكثافة بارزة.';
      
      if (text === 'Craft Ceramic Mug') return 'كوب سيراميك يدوي';
      if (text === '12oz matte ceramic finish. Dishwasher safe, high-temperature firing for durability.')
        return 'سيراميك مطفأ سعة 12 أونصة. آمن لغسالة الأطباق، معالج بحرارة عالية للمتانة.';

      if (text === 'Premium Vinyl Stickers') return 'ملصقات فينيل ممتازة';
      if (text === 'Thick, weather-resistant vinyl with UV protection. Perfect for outdoor/indoor gear.')
        return 'فينيل سميك مقاوم للعوامل الجوية مع حماية من الأشعة فوق البنفسجية. مثالي للمعدات الداخلية والخارجية.';

      if (text === 'Linen Executive Cards') return 'بطاقات عمل كتانية فاخرة';
      if (text === '350GSM premium cotton-linen stock. Elegant texture with tactile debossing options.')
        return 'ورق قطن وكتان فاخر 350 جرام. ملمس أنيق مع خيارات حفر بارز ملموسة.';

      if (text === 'Eco-Kraft Shipping Box') return 'صندوق شحن كرافت صديق للبيئة';
      if (text === 'Thick corrugated kraft cardboard. Flat-packed, easy tab locking, fully recyclable.')
        return 'كرتون كرافت مموج سميك. يأتي مسطحاً، سهل القفل، وقابل لإعادة التدوير بالكامل.';

      // Materials
      if (text === '100% Organic Cotton') return 'قطن عضوي 100%';
      if (text === 'Recycled Poly-Blend') return 'بوليستر معاد تدويره مخلوط';
      if (text === 'Luxury Pima Cotton') return 'قطن بيما فاخر';
      if (text === 'Glazed Ceramic') return 'سيراميك مصقول';
      if (text === 'Matte Earthware') return 'فخار مطفأ';
      if (text === 'Double-Walled Steel') return 'فولاذ مزدوج الجدار';
      if (text === 'Matte Vinyl') return 'فينيل مطفأ';
      if (text === 'Glossy Weatherproof') return 'لامع مقاوم للطقس';
      if (text === 'Holographic Prism') return 'منشور ثلاثي الأبعاد هولوغرافي';
      if (text === 'Textured Cotton Linen') return 'كتان قطني ذو ملمس';
      if (text === 'Smooth Soft-Touch') return 'ناعم ملمس حريري';
      if (text === 'Triple-Layer Color-Core') return 'ثلاثي الطبقات ملون الأطراف';
      if (text === 'Natural Brown Kraft') return 'ورق كرافت بني طبيعي';
      if (text === 'Bleached White Board') return 'ورق كرتون أبيض مبيض';
      if (text === 'Matte Black Premium Card') return 'كرتون أسود مطفأ فاخر';

      // Finishes
      if (text === 'Standard Screen Print') return 'طباعة شاشة قياسية';
      if (text === 'High-Density Puff Print') return 'طباعة منفوخة عالية الكثافة';
      if (text === 'Premium Embroidery') return 'تطريز بريميوم فاخر';
      if (text === 'Standard Sublimation') return 'تسامي حراري قياسي';
      if (text === 'Laser Engraved') return 'نقش بالليزر';
      if (text === 'Gloss-Enamel Decal') return 'ملصق مينا لامع';
      if (text === 'Die-Cut Shape') return 'قص مخصص قالب';
      if (text === 'Kiss-Cut Sheet') return 'قص سطحي شيت';
      if (text === 'Cracked Ice Laminate') return 'طبقة حماية ثلجية لامعة';
      if (text === 'Flat Matte Ink') return 'حبر مطفأ مسطح';
      if (text === 'Blind Debossing') return 'حفر غائر بدون حبر';
      if (text === 'Metallic Foil Stamping') return 'ختم رقائق معدنية لامعة';
      if (text === 'Flexo Eco-Ink') return 'طباعة فليكسو بحبر بيئي';
      if (text === 'UV Selective Gloss') return 'تلميع فوق بنفسجي موضعي UV';
      if (text === 'Hot Foil Emboss') return 'بصمة حرارية بارزة';
    }
    return text;
  };

  return {
    name: translateText(name),
    description: translateText(description),
    materials: product.materials?.map(m => ({ ...m, name: translateText(m.name) })) || [],
    finishes: product.finishes?.map(f => ({ ...f, name: translateText(f.name) })) || []
  };
};
