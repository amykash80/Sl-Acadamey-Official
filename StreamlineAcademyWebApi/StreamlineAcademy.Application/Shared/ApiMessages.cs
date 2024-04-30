using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamlineAcademy.Application.Shared
{
public static class APIMessages
{
    // Common Errors 
    public static readonly string TechnicalError = "There is some technical error, please try again later.";
    public static readonly string ProjectName = "Streamline Academies";
    public static readonly string AlreadyAvailable = "Already Registered";
    public static readonly string NotFound = "Not found.";
    public static readonly string InvaildStatusCode = "Invalid status code.";
    public static readonly string UpdatedSuccessfully = "Updated Successfully.";
    public static readonly string VerifyEmailLink = "api/auth/verifyemail";
    public static readonly string ValidationException = "Validation error";
    public static readonly string ForbiddenException = "Forbidden error";
    public static readonly string InfoOrAndConflictException = "Info/Conflict error";
    public static readonly string DbUpdateException = "Database Update Exception";
    public static readonly string ResetPasswordLink = "api/auth/resetpassword";
    public static readonly string Success = "Success.";
    public static readonly string Error = "Error.";
    public static readonly string InvaildAPIStatusCodes = "Invalid status code.";
    public static readonly string Admin = "Admin";
    public static readonly string EmailTemplates = "EmailTemplates";
    public static readonly string Templates = "D:\\Repository\\KashmirService\\API\\KashmirServices-Api\\KashmirService.Infrastructure\\EmailTemplates";
    public static readonly string ConfirmEmailSubject = "Verify Your Email And Complete Registration";
    public static readonly string PasswordResetEmailSubject = "Reset Your Password";

    public static class Addresses
    {
        public static readonly string NoAddressFound = "No addresses found";
        public static readonly string AddressUpdated = "Address updated successfully";
    }
        public static class BatchManagement
        {
            public static readonly string BatchNotFound = "Batch not found.";
            public static readonly string BatchUpdated = "Batch Updated Successfully.";
            public static readonly string BatchnotFound = "Batch not found.";
            public static readonly string BatchAlreadyExists = "Batch already Exists";
            public static readonly string BatchAdded = "Batch Added Successfully.";
            public static readonly string BatchDeleted = "Batch deleted Successfully";
           

        }
        public static class CourseResourceManagement
        {
            
            public static readonly string CourseResourceUpdated = "CourseResource Updated Successfully.";
            public static readonly string CourseResourcenotFound = "CourseResource not found.";
            public static readonly string CourseResourceAdded = "CourseResource Added Successfully.";
            public static readonly string CourseResourceDeleted = "CourseResource deleted Successfully";


        }
        public static class ContentManagement
        {
            public static readonly string ContentNotFound = "Content not found.";
            public static readonly string ContentAdded = "Content Added Successfully.";
            public static readonly string ContentUpdated = "Content Updated Successfully.";
            public static readonly string ContentDeleted = "Content deleted Successfully";
            public static readonly string CourseContentNotFound = "CourseContent not Found";

        }
        public static class ScheduleManagement
        {
            public static readonly string ScheduleAdded = "Schedule Added Successfully.";
            public static readonly string ScheduleNotFound = "Schedule not found for this batch.";
            public static readonly string ScheduleFound = "Schedule  found for this batch.";
            public static readonly string AllScheduleNotFound = "Schedule not found.";
            public static readonly string ScheduleUpdated = "Schedule Updated Successfully.";
            public static readonly string StartTimeMustbebeforeEndtime = "Start time must be before end time.";
        }

        public static class CourseManagement
    {
        public static readonly string CourseNotFound = "Course not found.";
        public static readonly string CourseAdded = "Course Added Successfully.";
        public static readonly string CourseUpdated = "Course Updated Successfully.";
        public static readonly string CourseAlreadyRegistered = "Course already Added";
        public static readonly string CourseDeleted = "Course deleted Successfully";
        public static readonly string NoCourse = "No ourse found for Academy";

        }
        public static class CourseCategoryManagement
        {
            public static readonly string CourseCategoryNotFound = "CourseCategory not found.";
            public static readonly string CourseCategoryAdded = "CourseCategory Added Successfully.";
            public static readonly string CourseUpdated = "Course Updated Successfully.";
            public static readonly string CourseCategoryAlreadyRegistered = "CourseCategory already Added";

        }
        public static class LocationManagement
        {
            public static readonly string LocationNotFound = "Location not found.";
            public static readonly string LocationAdded = "Location Added Successfully.";
            public static readonly string LocationUpdated = "Location Updated Successfully.";
            public static readonly string LocationAlreadyRegistered = "Location already Added";
            public static readonly string LocationDeleted = "Location Deleted";


        }
        public static class AcademyManagement
		{
			public static readonly string AcademyNotFound = "Academy not found.";
			public static readonly string AcademyAdded = "Academy Registered Successfully.";
			public static readonly string AcademyUpdated = "Academy Updated Successfully.";
			public static readonly string AcademyDeleted = "Academy Deleted Successfully.";
            public static readonly string AcademyAlreadyRegistered = "Academy with this email already registered";

		}
        public static class UserManagement
        {
            public static readonly string UserNotFound = "user not found.";
            public static readonly string UserAdded = "user Registered Successfully.";
            public static readonly string UserUpdated = "user Updated Successfully.";
            public static readonly string UserDeleted = "user Deleted Successfully.";
            public static readonly string UserAlreadyRegistered = "user with this email already registered";

        
        }
        public static class InstructorManagement
        {
            public static readonly string InstructorNotFound = "Instructor not found.";
            public static readonly string InstructorAdded = "Instructor Registered Successfully.";
            public static readonly string InstructorUpdated = "Instructor Updated Successfully.";
            public static readonly string InstructorDeleted = "Instructor Deleted Successfully.";
            public static readonly string InstructorAlreadyRegistered = "Instructor with this email already registered";

        }
        public static class StudentManagement
        {
            public static readonly string StudentNotFound = "Student not found.";
            public static readonly string StudentAdded = "Student Registered Successfully.";
            public static readonly string StudentUpdated = "Student Updated Successfully.";
            public static readonly string StudentDeleted = "Student Deleted Successfully.";
            public static readonly string StudentAlreadyRegistered = "Student with this email already registered";
            public static readonly string BatchAssigned = "batch Assigned";


        }

        public static class EnquiryManagement
		{
			public static readonly string EnquiryNotFound = "Enquiry not found.";
			public static readonly string EnquiryAdded = "Enquiry Added Successfully.";
			public static readonly string EnquiryUpdated = "Enquiry Updated Successfully.";
            public static readonly string EnquiryDeleted = "Enquiry Deleted Successfully.";
            public static readonly string EnquiryNameExist = "Name already Exist.";
            public static readonly string EnquiryEmailExist = "Email already Exist.";
            public static readonly string InvalidCredential = "Invalid Credentials.";
        }

        public static class ProfileManagement
        {
            public static readonly string UserNotFound = "User not found.";
            public static readonly string ContactUpdated = "Contact Updated Successfully.";
            public static readonly string UserFound = "User found.";
            public static readonly string AddressUpdated = "Address Updated Successfully.";
            public static readonly string PhotoUploaded = "Photo Uploaded Successfully."; 
        }

        public static class Auth
    {
        public const string NameAlreadyTaken = "Name is already taken.";
         public const string InvalidCredential = "invalid Credentials";
        public const string EmailAlreadyRegistered = "Email already registered.";
        public const string PhoneNumberAlreadyRegistered = "Phone Number already registered.";
        public const string EmailOrPasswordIsIncorrect = "Email or/and Password is Incorrect.";
        public const string PasswordChangedSuccess = "Password changed successfully.";
        public const string LinkExpired = "Email verification link has been expired, please try again.";
        public const string EmailVerified = "Email verified successfully, please try to login again.";
        public const string VerifyEmailError = "Please verify your email to login.";
        public const string InactiveUser = "Your account is temporarily inactive. Please contact the administrator for assistance.";
        public const string InVaildEmailAddress = "User not found, please enter a vaild email.";
        public const string CheckEmailToResetPassword = "Please check your email inbox for instructions on how to reset your password.";
        public const string PasswordResetSuccess = "Your password has been successfully reset. You can now log in using your new password.";
        public const string UserNotFound = "User not found";
        public const string IncorrectOldPassword = "Old Password is Incorrect";
        public const string LoggedIn = "Successfully logged in";
        public const string InValidResetCode = "Invalid Reset Code";

        }

        public static class TemplateNames
    {
            public static readonly string AcademyRegistration = "AcademyRegistration.cshtml";
            public static readonly string PasswordReset = "PasswordReset.cshtml";
    }
		public static class AppRoutes
		{
			public static readonly string ClientResetPasswordRoute = "resetpassword";
			public static readonly string loginRoute = "login";

		}

	}

}
