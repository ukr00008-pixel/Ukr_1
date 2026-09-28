const applications = [
    {
        applicationId: "GOV-HOUS-1001",
        citizenId: "CIT001",
        citizen: {
            name: "Aarav Sharma",
            dateOfBirth: "1992-05-15",
            mobile: "9876543210",
            address: "12/A Rajpur Road, Dehradun, Uttarakhand"
        },
        status: "UNDER_REVIEW",
        departments: {
            housing: "SUBMITTED",
            income: "VERIFIED",
            land: "VERIFIED"
        },
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        decision: null
    },
    {
        applicationId: "GOV-HOUS-1002",
        citizenId: "CIT002",
        citizen: {
            name: "Priya Rawat",
            dateOfBirth: "1988-11-20",
            mobile: "9812345678",
            address: "45 Mall Road, Nainital, Uttarakhand"
        },
        status: "UNDER_REVIEW",
        departments: {
            housing: "SUBMITTED",
            income: "FAILED",
            land: "VERIFIED"
        },
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        decision: null
    }
];

function createApplication(data) {

    const application = {
        applicationId: `GOV-HOUS-${Date.now()}`,

        citizenId: data.citizenId,

        citizen: {
            name: data.name,
            dateOfBirth: data.dateOfBirth,
            mobile: data.mobile,
            address: data.address
        },

        status: "UNDER_REVIEW",

        departments: {
            housing: "SUBMITTED",
            income: "PENDING",
            land: "PENDING"
        },

        createdAt: new Date().toISOString(),

        decision: null
    };

    applications.push(application);

    return application;
}


function getApplicationById(applicationId) {

    return applications.find(
        application =>
            application.applicationId === applicationId
    );
}


function getApplicationsByCitizen(citizenId) {

    return applications.filter(
        application =>
            application.citizenId === citizenId
    );
}

function getApplicationsByOfficerRole(role) {

    if (role === "admin" || role === "housing_officer") {
        return applications;
    }

    if (role === "income_officer") {
        return applications.filter(
            application =>
                application.departments.income === "VERIFIED" ||
                application.departments.income === "PENDING"
        );
    }

    if (role === "land_officer") {
        return applications.filter(
            application =>
                application.departments.land === "VERIFIED" ||
                application.departments.land === "PENDING"
        );
    }

    return [];
}

function updateApplicationDecision(
    applicationId,
    decisionData
) {

    const application = applications.find(
        item => item.applicationId === applicationId
    );

    if (!application) {
        return null;
    }

    application.status = decisionData.status;

    application.decision = {
        status: decisionData.status,
        by: decisionData.by,
        role: decisionData.role,
        at: new Date().toISOString(),
        reason: decisionData.reason || null
    };

    return application;
}


module.exports = {
    createApplication,
    getApplicationById,
    getApplicationsByCitizen,
    getApplicationsByOfficerRole,
    updateApplicationDecision
};