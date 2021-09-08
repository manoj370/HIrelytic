import { environment } from "../../environments/environment";

export class HttpUrls {
  // NEW URLS
  public static SIGNIN_ORG = `${environment.authUrl}oauth2/oauth/token`;
  public static LOGOUT_APPLICATION = `${environment.authUrl}oauth2/api/v1/oauth/token/deleteRefreshTokenAndAccessTokens`;
  public static REFRESH_TOKEN = `${environment.authUrl}oauth2/oauth/token`;
  public static GET_USER = `${environment.serviceUrl}api/v1/user/get-loggedin-user`;
  public static SIGNUP_ORG = `${environment.serviceUrl}api/v1/organization/tenant-signup`;
  public static FIND_ORGANISATION_BY_URL = `${environment.serviceUrl}api/v1/organization/findOrganizationByUrl`;
  public static FORGOT_PASSWORDD = `${environment.serviceUrl}api/v1/user/forgotPassword`;
  public static CHECK_ORGANISATION = `${environment.serviceUrl}api/v1/organization/findByOrgName`;
  public static RESET_PASSSWORD = `${environment.serviceUrl}api/v1/user/reset-password`;
  public static CHANGE_PASSWORD = `${environment.serviceUrl}api/v1/user/change-password`;
  public static REQUEST_DEMO = `${environment.serviceUrl}api/v1/demoRequest/requestForDemo`;
  public static COUNTRIES_LIST = `${environment.serviceUrl}api/v1/masterData/countriesList`;
  public static STATES_LIST = `${environment.serviceUrl}api/v1/masterData/statesList`;
  public static ACTIVATING_ORGANISATION = `${environment.serviceUrl}api/v1/organization/activate`;

  // CLIENT APIS
  public static CHECK_CLIENT_NAME = `${environment.serviceUrl}api/v1/client/clientNameChecking?clientName=`;
  public static CREATE_CLIENT = `${environment.serviceUrl}api/v1/client/create-client`;
  public static GET_CLIENTSS = `${environment.serviceUrl}api/v1/client/getClients`;
  public static GET_CLIENTSS_PAGINATION = `${environment.serviceUrl}api/v1/client/getClientsPagination`;
  public static GET_DETAILS_CLIENT_ID = `${environment.serviceUrl}api/v1/client/getClientById`;
  public static EDIT_CLIENT = `${environment.serviceUrl}api/v1/client/update-client`;
  public static CREATE_MANAGER = `${environment.serviceUrl}api/v1/client/createManager`;
  public static GET_MANAGER_LIST = `${environment.serviceUrl}api/v1/client/getManagers`;
  public static CHANGE_STATUS_CLIENT = `${environment.serviceUrl}api/v1/client/clientStatus`;
  public static ASSIGNClIENTTOUSER = `${environment.serviceUrl}api/v1/client/assignClientToUser`;
  public static CLIENT_JOBS = `${environment.serviceUrl}api/v1/jobReference/clientJobsPerUser`;
  public static LIST_OF_USERS_WORKING_ON_SELECTED_CLIENT = `${environment.serviceUrl}api/v1/client/get-client-users`;
  public static GETALLUSERS = `${environment.serviceUrl}api/v1/client/get-user`;
  public static EDIT_MANAGER = `${environment.serviceUrl}api/v1/client/editManager`;

  // POST JOB
  public static ADD_JOB = `${environment.serviceUrl}api/v1/hireRequest/postAJob`;
  public static POST_JOB_LOCATIONS = `${environment.serviceUrl}api/v1/masterData/locations`;
  public static QUALIFICATION_LIST = `${environment.serviceUrl}api/v1/masterData/qualificationListNames`;
  public static GET_FUNCTIONAL_AREA = `${environment.serviceUrl}api/v1/masterData/functionalArea`;
  public static GET_DEPT = `${environment.serviceUrl}api/v1/masterData/departments`;
  public static GET_DESG = `${environment.serviceUrl}api/v1/masterData/designation`;

  // JOBS
  public static GET_NEXT_JOB_CODE = `${environment.serviceUrl}api/v1/tenantSetting/nextJobCode`;
  public static GET_JOB_LIST_OTHERS = `${environment.serviceUrl}api/v1/hireRequest/tenant`;
  public static APPROVE_MULTIPLE_JOB = `${environment.serviceUrl}api/v1/hireRequest/approveHireRequest`;
  public static REJECT_MULTIPLE_JOB = `${environment.serviceUrl}api/v1/hireRequest/rejectHireRequest`;
  public static CLOSE_MULTIPLE_JOB = `${environment.serviceUrl}api/v1/hireRequest/updateHireRequestStatus`;
  public static ONHOLD_MULTIPLE_JOB = `${environment.serviceUrl}api/v1/hireRequest/onHoldHireRequest`;
  public static ONHOLD_PRIVILEGE_JOB = `${environment.serviceUrl}api/v1/hireRequest/updateHireRequestStatus`;
  public static GET_JOB_DETAILS = `${environment.serviceUrl}api/v1/hireRequest/getHireRequest`;
  public static UPDATE_JOB_LIST = `${environment.serviceUrl}api/v1/hireRequest/updateHireRequest`;
  public static SEARCH_ALL_JOBS_ADMIN = `${environment.serviceUrl}api/v1/hireRequest/searchAllJobs?tenantId=`;
  public static SEARCH_ALL_JOBS_USER = `${environment.serviceUrl}api/v1/hireRequest/searchJobsByUserId`;
  public static SEARCH_ALL_JOBS_ACCOUNTMANAGER = `${environment.serviceUrl}api/v1/hireRequest/searchJobsByCreatedBy`;
  public static GET_LIST_RECRUITERS = `${environment.serviceUrl}api/v1/user/get-user-by-authority`;
  public static ASSIGN_JOBS_TO_RECRUITERS = `${environment.serviceUrl}api/v1/jobReference/assignJobsToRecruiters`;
  public static UNASSIGNED_JOB = `${environment.serviceUrl}api/v1/jobReference/unAssignJobsToRecruiters`;
  public static GET_JOB_LIST_RECRUITER = `${environment.serviceUrl}api/v1/hireRequest/getListJobsAssignedTOOneRecruiter`;
  public static GET_JOB_LIST_ACCOUNTMANAGER = `${environment.serviceUrl}api/v1/hireRequest/getHireRequestsCreatedByUser`;

  // JOBS PDFS AND EXCELS AND ALL PDFS AND EXCELS
  public static JOBS_REPORT_PDF = `${environment.serviceUrl}api/v1/downloadReports/jobsReportDownload`;
  public static JOBS_REPORT_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/jobsReportDownload`;
  public static JOBS_REPORT_PDF_USER = `${environment.serviceUrl}api/v1/downloadReports/jobsReportDownloadForIndividual`;
  public static JOBS_REPORT_EXCEL_USER = `${environment.serviceUrl}api/v1/downloadReports/jobsReportDownloadForIndividual`;
  public static VENDOR_JOBS_PDF = `${environment.vendorUrl}api/v1/vendor/vendorHireRequestsDownload`;
  public static VENDOR_JOBS_EXCEL = `${environment.vendorUrl}api/v1/vendor/vendorHireRequestsDownload`;
  public static VENDOR_PAYMENTDETAILS_ADMIN_PDF = `${environment.vendorUrl}api/v1/vendorReports/downloadVendorPaymentInformationForAdmin`;
  public static VENDOR_PAYMENTDETAILS_ADMIN_EXCEL = `${environment.vendorUrl}api/v1/vendorReports/downloadVendorPaymentInformationForAdmin`;
  public static MYPAYMENTDETAILS_PDF = `${environment.vendorUrl}api/v1/vendorReports/downloadVendorPaymentInformation`;
  public static MYPAYMENTDETAILS_EXCEL = `${environment.vendorUrl}api/v1/vendorReports/downloadVendorPaymentInformation`;
  public static VENDOR_PAYMENT_STATUS = `${environment.vendorUrl}api/v1/vendorPayments/getVendorPaymentStatus`;
  public static CHANGE_VENDOR_PAYMENT_STATUS = `${environment.vendorUrl}api/v1/vendorPayments/changeVendorPaymentStatus`;
  public static ASSIGNED_JOBS_REPORT_PDF = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownloadForAdmin`;
  public static REJECTED_JOBS_REPORT_PDF = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownloadForAdmin`;
  public static ON_HOLD_PDF = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownloadForAdmin`;
  public static CLOSED_PDF = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownloadForAdmin`;
  public static ASSIGNED_JOBS_REPORT_PDF_USER = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownload`;
  public static REJECTED_JOBS_REPORT_PDF_USER = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownload`;
  public static ON_HOLD_PDF_USER = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownload`;
  public static CLOSED_PDF_USER = `${environment.serviceUrl}api/v1/downloadReports/statusBasedJobsReportDownload`;

  // public static GET_ROLES = `${environment.serviceUrl}api/v1/role/roles`;

  // RESUMES
  public static RESUME_PARSING = `${environment.serviceUrl}api/v1/jcrRequest/resumeToString`;
  public static VERIFY_CANDIDATE_FOR_RESUME = `${environment.serviceUrl}api/v1/candidate/create-candidate-by-recruiter`;
  public static UPLOAD_RESUME = `${environment.serviceUrl}api/v1/jcrRequest`;
  public static UPDATE_RESUME = `${environment.serviceUrl}api/v1/jcrRequest/jcrupdate`;
  public static UPDATE_CANDIDATE_RESUME = `${environment.serviceUrl}api/v1/candidate/update-candidate`;
  public static VIEW_RESUME = `${environment.serviceUrl}api/v1/jobReference/appliedjobs`;

  public static VIEW_FORMATTED_RESUME = `${environment.jcrURL}api/v1/digital/get-request-document`;
  public static VIEW_FULL_RESUME = `${environment.jcrURL}api/v1/digital/get-request-document`;
  public static DOWNLOAD_RESUME = `${environment.jcrURL}api/v1/digital/get-request-documentsss`;
  public static DOWNLOAD_FORMATTED_RESUME = `${environment.jcrURL}api/v1/digital/get-request-documentsss`;

  public static SEARCH_RESUME = `${environment.elasticSearchUrl}/resumes_index/_search?`;
  public static SEARCH_RESUME_VIEW = `${environment.serviceUrl}api/v1/jobReference/findjobreferenceByreferenceid/`;
  public static GET_ALL_STATUS = `${environment.serviceUrl}api/v1/candidate/get-resume-status`;
  public static GET_ALL_CANDIDATE_STATUS = `${environment.serviceUrl}api/v1/candidate/get-candidate-status`;
  public static RE_INSTATE_STATUS = `${environment.serviceUrl}api/v1/candidate/get-all-candidate-status`;
  public static CREATE_STATUS = `${environment.serviceUrl}api/v1/candidate/create-candidate-stage`;
  public static CHANGE_RESUME_STATUS = `${environment.serviceUrl}api/v1/candidate/change-profile-status`;

  public static GET_ALL_QUALIFICATIONS = `${environment.serviceUrl}api/v1/masterData/qualificationList`;
  public static GET_ALL_SPECIALIZATIONS = `${environment.serviceUrl}api/v1/masterData/specializationListByQualId`;
  public static GET_COUNTRIES = `${environment.serviceUrl}api/v1/masterData/countriesList`;

  // REPORTS
  public static GET_REC_METRICS = `${environment.serviceUrl}api/v1/reports/getjobreferencedata`;
  // public static GET_CANDIDATES_PROFILES = `${environment.serviceUrl}api/v1/reports/adminCandidateReportWithPagination`;
  public static GET_CANDIDATES_PROFILES = `${environment.serviceUrl}api/v1/reports/AdminCandidateReport`;
  public static GET_MONTHWISE_REC_METRICS_ADMIN = `${environment.serviceUrl}api/v1/reports/monthWiseRecruitmentMetrics`;
  public static JOINEES_REPORT_ADMIN = `${environment.serviceUrl}api/v1/reports/adminCandidatesJoined`;
  public static GET_OPEN_POSITIONS_ADMIN = `${environment.serviceUrl}api/v1/reports/openjobs`;
  public static GET_RECRUITER_INDIVIDUAL_REPORT = `${environment.serviceUrl}api/v1/reports/IndividualRecruiterReport`;
  public static GET_RECRUITER_PERFORMANCE_REPORT_ADMIN = `${environment.serviceUrl}api/v1/reports/AdminRecruiterReport`;

  public static GET_LIST_RECRUITERS_REPORTS = `${environment.serviceUrl}api/v1/user/getUserByRoleName`;
  public static GET_REC_METRICS_INDIVIDUAL_RECRUITER_REPORT = `${environment.serviceUrl}api/v1/reports/getJobReferenceDataIndividual`;
  public static GET_INDIVIDUAL_CANDIDATE_PROFILES_REPORT = `${environment.serviceUrl}api/v1/reports/individualCandidateReport`;
  public static GET_MONTHWISE_REC_METRICS_USER = `${environment.serviceUrl}api/v1/reports/monthWiseRecruitmentMetricsForIndividualUser`;
  public static JOINEES_REPORT_USER = `${environment.serviceUrl}api/v1/reports/individualCandidatesJoined`;
  public static GET_OPEN_POSITIONS_RECRUITER = `${environment.serviceUrl}api/v1/jobReference/openJobsReportForRecruiter`;

  // REPORTS PDFS AND EXCELS
  public static JOINEES_REPORT_ADMIN_PDF = `${environment.serviceUrl}api/v1/downloadReports/adminJoinesDownload`;
  public static JOINEES_REPORT_ADMIN_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/adminJoinesDownload`;

  public static DOWNLOAD_CANDIDATE_PROFILES_REPORT_PDF = `${environment.serviceUrl}api/v1/downloadReports/reportDocumentGenerator`;
  public static DOWNLOAD_CANDIDATE_PROFILES_REPORT_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/reportDocumentGenerator`;

  public static DOWNLOAD_CANDIDATE_PROFILES_REPORT_PDF_RECRUITER = `${environment.serviceUrl}api/v1/downloadReports/recruiterReportGenerator`;
  public static DOWNLOAD_CANDIDATE_PROFILES_REPORT_RECRUITER_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/recruiterReportGenerator`;

  public static DOWNLOAD_OPEN_POISTIONS_REPORT_PDF = `${environment.serviceUrl}api/v1/downloadReports/openPositionsDownload`;
  public static DOWNLOAD_OPEN_POISTIONS_REPORT_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/openPositionsDownload`;

  public static TEAM_PERFORMANCE_PDF = `${environment.serviceUrl}api/v1/downloadReports/adminRecruiterDownload`;
  public static TEAM_PERFORMANCE_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/adminRecruiterDownload`;

  public static DOWNLOAD_OPEN_POISTIONS_REPORT_PDF_RECRUITER = `${environment.serviceUrl}api/v1/downloadReports/recruiterOpenPositionsDownload`;
  public static DOWNLOAD_OPEN_POISTIONS_REPORT_EXCEL_RECRUITER = `${environment.serviceUrl}api/v1/downloadReports/recruiterOpenPositionsDownload`;
  public static JOINEES_REPORT_USER_PDF = `${environment.serviceUrl}api/v1/downloadReports/recruiterJoinesDownload`;
  public static JOINEES_REPORT_USER_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/recruiterJoinesDownload`;
  // PROFILE SETTINGS

  public static UPDATE_TENANT_PROFILE_PIC = `${environment.serviceUrl}api/v1/jcrRequest/updateuserprofilepic`;
  public static ADD_TENANT_LOGO = `${environment.serviceUrl}api/v1/jcrRequest/uploadLogo`;
  public static UPDATE_USER_PROFILE_PIC = `${environment.serviceUrl}api/v1/jcrRequest/updateuserprofilepic`;

  public static GET_PROFILE_PIC = `${environment.jcrURL}api/v1/digital/get-request-documentsss`;

  public static GET_TENANT_LOGO = `${environment.jcrURL}api/v1/digital/get-request-documentsss`;

  public static UPDATE_TENENT_PROFILE = `${environment.serviceUrl}api/v1/organization/editOrUpdateTenantDetails`;
  public static UPDATE_PROFILE = `${environment.serviceUrl}api/v1/user/updatauserprofile`;
  public static GET_RESUME_SETTINGS = `${environment.serviceUrl}api/v1/tenantSetting/getRecruitmentConfigSettings`;
  public static UPDATE_RESUME_SETTINGS_CONFIGURAITON = `${environment.serviceUrl}api/v1/tenantSetting/updateRecruitmentConfigSettings`;

  public static LIST_OF_RECRUITERS_ASSIGNED_TO_JOB = `${environment.serviceUrl}api/v1/hireRequest/getListOfRecruitersAssignedTOOneJob`;
  public static LIST_OF_VENDORS_ASSIGNED_TO_JOB = `${environment.vendorUrl}api/v1/vendor/getListOfVendorsWorkingOnAJob`;
  public static UN_ASSIGN_VENDOR = `${environment.vendorUrl}api/v1/vendor/unAssignJobsToVendors`;

  // SUPERADMIN API CALLS
  public static GET_TENANTS_STATUS_COUNT = `${environment.serviceUrl}api/v1/reports/getOrgStatusCount`;
  public static GET_UNREGISTERED_TENANTS_LIST = `${environment.serviceUrl}api/v1/demoRequest/getUnRegisteredTenants`;
  public static GET_TENANT_LIST = `${environment.serviceUrl}api/v1/demoRequest/getAllOrganisations`;
  public static CHANGE_TENANT_STATUS = `${environment.serviceUrl}api/v1/demoRequest/OrganisationStatus`;
  public static RESEND_INVITATION_FOR_UNREGISTERED_TENANTS = `${environment.serviceUrl}api/v1/user/reSendEmail`;
  public static GET_REQUEST_DEMO = `${environment.serviceUrl}api/v1/demoRequest/getRequestedTenants`;

  // VENDORS
  public static INVITE_VENDOR = `${environment.vendorUrl}api/v1/vendor/inviteVendor`;
  public static CREATE_VENDOR = `${environment.vendorUrl}api/v1/vendor/createVendor`;
  public static GET_LIST_OF_VENDORS = `${environment.vendorUrl}api/v1/vendor/getListOfVendorsByTenantId`;
  public static CHANGE_VENDOR_STATUS = `${environment.authUrl}oauth2/api/v1/oauth/token/disableUser`;
  public static GET_VIEW_OF_VENDORS = `${environment.vendorUrl}api/v1/vendor/getVendorById`;
  public static UPDATE_VENDOR = `${environment.vendorUrl}api/v1/vendor/updateVendor`;
  public static GET_VENDORS_LIST = `${environment.vendorUrl}api/v1/vendor/activeVendorList`;
  public static PUBLISH_JOB = `${environment.vendorUrl}api/v1/vendor/publishJobToVendors`;
  public static VENDOR_JOBS = `${environment.vendorUrl}api/v1/vendor/vendorHireRequests`;
  public static VENDOR_UPLOAD_CANDIDATE = `${environment.vendorUrl}api/v1/vendor/vendorUploadCandidate`;
  public static VENDOR_SEARCH = `${environment.vendorUrl}api/v1/vendor/vendorHireRequestSearch`;
  public static VENDOR_VIEW_RESUMES = `${environment.vendorUrl}api/v1/vendor/vendor-resumes`;
  public static VENDOR_RESUMES = `${environment.vendorUrl}api/v1/vendor/all-vendor-resumes`;
  

  public static VENDOR_PAYMENT_SETTING = `${environment.vendorUrl}api/v1/vendorPayments/createVendorPaymentsettings`;
  public static VENDOR_PAYMENT_LIST = `${environment.vendorUrl}api/v1/vendorPayments/getVendorPaymentPolicies`;
  public static VENDOR_UPDATE_PAYMENT_POLICY = `${environment.vendorUrl}api/v1/vendorPayments/updateVendorPaymentsettings`;
  public static ASSIGN_PAYMENT_POLICY_TO_VENDOR = `${environment.vendorUrl}api/v1/vendorPayments/setVendorPaymentPolicy`;
  public static LIST_OF_VENDORS_BASED_ON_SETTING_ID = `${environment.vendorUrl}api/v1/vendorPayments/getListOfVendorsInThisPaymentPolicy`;

  public static PAYMENT_DETAILS_BASED_ON_VENDOR_ID = `${environment.vendorUrl}api/v1/vendorPayments/getVendorPaymentInformationForAdmin`;
  public static VENDOR_MY_PAYMENTS_INFORMATION = `${environment.vendorUrl}api/v1/vendorPayments/getVendorPaymentInformation`;

  // VENDOR
  public static VENDOR_DASHBOARD_CARD_DATA = `${environment.vendorUrl}api/v1/vendorReports/vendor-dashboard`;
  public static VENDOR_DASHBOARD_JOBS_LIST = `${environment.vendorUrl}api/v1/vendorReports/vendor-dashboard-jobs`;

  public static LIST_OF_VENDORS_ADMIN_DASHBOARD = `${environment.vendorUrl}api/v1/vendor/geVendorsByTenantId`;

  public static VENDORS_ADMIN_DASHBOARD = `${environment.vendorUrl}api/v1/vendorReports/vendor-dashboard-info-for-admin`;
  public static INDIVIDUAL_VENODR_STATISTICS_ADMIN_DASHBOARD = `${environment.vendorUrl}api/v1/vendorReports/vendorstatistics-dashboard-for-admin`;

  // INCENTIVES

  public static INCENTIVE_ADMIN_PDF = `${environment.serviceUrl}api/v1/downloadReports/get-all-joined-candidates-download`;
  public static INCENTIVE_ADMIN_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/get-all-joined-candidates-download`;
  public static INCENTIVE_USER_PDF = `${environment.serviceUrl}api/v1/downloadReports/get-joined-candidates-download`;
  public static INCENTIVE_USER_EXCEL = `${environment.serviceUrl}api/v1/downloadReports/get-joined-candidates-download`;

  // CANDIDATES DATABASE
  public static CANDIDATES_DATABASE_ROLES = `${environment.serviceUrl}api/v1/candidateDataBase/get-role-types`;
  public static CANDIDATES_DATABASE_GRID_BASEDON_TYPE_SEARCH = `${environment.serviceUrl}api/v1/candidateDataBase/candidate-profiles-by-created-user-type`;
  public static SEARCH = `${environment.serviceUrl}api/v1/candidateDataBase/search-candidate-profiles-by-created-user-type`;

  public static GET_TEMPLATE_NAMES = `${environment.serviceUrl}api/v1/candidateDataBase/get-mailTemplates-for-candidate-mailing`;
  public static POST_MAIL_TEMPLATE = `${environment.serviceUrl}api/v1/candidateDataBase/send-mail-to-multiple-candidates`;


  // NEW REPORTS
  public static CANDIDATE_ADMIN_REPORT = `${environment.serviceUrl}api/v1/revisedReports/new-AdminCandidateReport`;
  public static CANDIDATE_INDIVIDUAL_REPORT = `${environment.serviceUrl}api/v1/revisedReports/new-individualCandidateReport`;
  public static JOINEES_ADMIN_REPORT = `${environment.serviceUrl}api/v1/revisedReports/new-monthWiseRecruitmentMetrics`;
  public static JOINEES_INDIVIDUAL_REPORT = `${environment.serviceUrl}api/v1/revisedReports/new-monthWiseRecruitmentMetricsForIndividualUser`;
  public static TEAM_PERFORMANCE_ADMIN_REPORT = `${environment.serviceUrl}api/v1/revisedReports/getPerformanceMetricsOfAll`;
  public static TEAM_PERFORMANCE_INDIVIDUAL_REPORT = `${environment.serviceUrl}api/v1/revisedReports/getPerformanceMetricsOfAll`;
  // babu naik Api calls
  public static AllUsersList = `${environment.serviceUrl}api/v1/user/userList`;
  public static allUsers = `${environment.serviceUrl}api/v1/user/role/roles`;
  public static checkRoles = `${environment.serviceUrl}api/v1/user/role/checkRoleName`;
  public static AllUserRoles = `${environment.serviceUrl}api/v1/user/get-all-authorites`;
  public static AlljobStatus = `${environment.serviceUrl}api/v1/hireRequest/jobsByStatus`;
  public static createRole = `${environment.serviceUrl}api/v1/user/role/createRoleByTenant`;
  public static getPrevi = `${environment.serviceUrl}api/v1/user/role/getRole`;
  public static updateUserRoles = `${environment.serviceUrl}api/v1/user/role/assignNewPrivilegesToRole`;
  public static inviteUser = `${environment.serviceUrl}api/v1/user/inviteUser`;
  public static unregisterUsers = `${environment.serviceUrl}api/v1/user/getListofUnregisteredUsers`;
  public static resendMail = `${environment.serviceUrl}api/v1/user/reSendEmail`;
  public static firtPie = `${environment.serviceUrl}api/v1/reports/getJobreferenceDataTimeWise`;
  public static dashBoardAlldata = `${environment.serviceUrl}api/v1/dashboardReports/jobStatusCount`;
  public static barchart = `${environment.serviceUrl}api/v1/dashboardReports/jobStatusWave`;
  public static clientsCount = `${environment.serviceUrl}api/v1/client/dashboard-clients-info`;
  public static candidateChart = `${environment.serviceUrl}api/v1/dashboardReports/candidatesProfilesReport`;
  public static recrutersChart = `${environment.serviceUrl}api/v1/dashboardReports/candidateProfilesReportOfRecruiters`;
  public static accountsMngChart = `${environment.serviceUrl}api/v1/dashboardReports/accountManagerReport`;
  public static getrecruters = `${environment.serviceUrl}api/v1/user/getUserByRoleName`;
  public static CREATE_USER = `${environment.serviceUrl}api/v1/user/createUser`;
  public static jobstatusList = `${environment.serviceUrl}api/v1/hireRequest/getListJobsAssignedTOOneRecruiter`;
  public static accountJobs = `${environment.serviceUrl}api/v1/hireRequest/getHireRequestsCreatedByUserByStatus`;
  public static disabledUser = `${environment.authUrl}oauth2/api/v1/oauth/token/disableUser`;
  public static EDIT_STATUS = `${environment.serviceUrl}api/v1/candidate/update-resume-status`;
  public static updateRole = `${environment.serviceUrl}api/v1/user/role/updateRole`;
  public static incentiveCreate = `${environment.serviceUrl}api/v1/incentive/create-setting`;
  public static getAllIncentives = `${environment.serviceUrl}api/v1/incentive/get-incentive-setting`;
  public static getallCandidateJoined = `${environment.serviceUrl}api/v1/incentive/get-all-joined-candidates`;
  public static CHECK_RESUME_STATUS = `${environment.serviceUrl}api/v1/candidate/check-resume-status`;
  public static updateIntives = `${environment.serviceUrl}api/v1/incentive/update-setting`;
  public static getjoinedCandidates = `${environment.serviceUrl}api/v1/incentive/get-joined-candidates`;
  public static viewTenatData = `${environment.serviceUrl}api/v1/demoRequest/getOrganizationDetails`;
  public static getModulesList = `${environment.serviceUrl}api/v1/demoRequest/get-list-modules`;
  public static updateModules = `${environment.serviceUrl}api/v1/demoRequest/editOrganizationBySuperAdmin`;
  public static candidateRoles = `${environment.serviceUrl}api/v1/candidateDataBase/get-role-types`;
  public static previModules = `${environment.serviceUrl}api/v1/user/get-all-by-modulewise-authorites`;
  public static intervierRolesList = `${environment.serviceUrl}api/v1/incentive/get-incentiver-role`;
  public static intervieStatusList = `${environment.serviceUrl}api/v1/incentive/getPaymentStatus`;
  public static intervieStatusUpdate = `${environment.serviceUrl}api/v1/incentive/changePaymentStatus`;
  public static inviteEmployee = `${environment.employeeUrl}api/v1/employee/inviteEmployee`;
  public static createEmployee = `${environment.employeeUrl}api/v1/employee/createEmployee`;
  public static getAllEmployees = `${environment.employeeUrl}api/v1/employee/get-all-Employee`;
  public static postEmployees = `${environment.employeeUrl}api/v1/employee/uploadFile`;
  public static downloadSheet = `${environment.employeeUrl}api/v1/employee/downloadFile`;
  public static getCountEmployee = `${environment.employeeUrl}api/v1/employee/employee-count`;
  public static getEmployeeList = `${environment.employeeUrl}api/v1/employee/employee-referral-jobs`;
  public static getRefferalResumesList = `${environment.employeeUrl}api/v1/employee/all-referred-resumes`;
  public static candidateInvite = `${environment.employeeUrl}api/v1/employee/refer-candidate`;
  public static candidateDataSend = `${environment.employeeUrl}api/v1/employee/referreUploadCandidate`;
  public static VIEW_REFERRAL_RESUMES = `${environment.employeeUrl}api/v1/employee/referred-resumes`;
}
