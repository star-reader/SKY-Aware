export default (rating: number) => {
    switch (rating) {
        case 0:
            return 'Banned'
        case 1:
            return 'Observer'
        case 2:
            return 'Student 1'
        case 3:
            return 'Student 2'
        case 4:
            return 'Student 3'
        case 5:
            return 'Controller 1'
        case 6:
            return 'Controller 2'
        case 7:
            return 'Controller 3'
        case 8:
            return 'Instructor 1'
        case 9:
            return 'Instructor 2'
        case 10:
            return 'Instructor 3'
        case 11:
            return 'Supervisor'
        case 12:
            return 'Administrator'
        default:
            return 'Observer'
    }
}