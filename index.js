// Your code here

function createEmployeeRecord(array) {
    if (array.length === 0) {
        return {
            timeInEvents: [],
            timeOutEvents: []
        }
    } else {
        return {
            firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
        }
    }
}

function createEmployeeRecords(Arrays) {
    let EmployeeRecords = []
    Arrays.map(array => EmployeeRecords.push(createEmployeeRecord(array)))
    return EmployeeRecords
}

function createTimeInEvent(employeeObjectRecord, date) {
    employeeObjectRecord.timeInEvents.push ({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return employeeObjectRecord
}

function createTimeOutEvent(employeeObjectRecord, stampDate) {
    employeeObjectRecord.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(stampDate.split(" ")[1]),
        date: stampDate.split(" ")[0]
    })
    return employeeObjectRecord
}

function hoursWorkedOnDate(employeeObjectRecord, date) {
    const timeinObj = employeeObjectRecord.timeInEvents.find(dayObj => dayObj.date === date)
    const timeinHours = timeinObj.hour
    const timeoutObj = employeeObjectRecord.timeOutEvents.find(dayObj => dayObj.date === date)
    const timeoutHours = timeoutObj.hour
    const time = timeoutHours - timeinHours
    const hours = Math.floor(time/100)
    return hours
}

function wagesEarnedOnDate(employeeObjectRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeObjectRecord, date)
    const payPerHour = employeeObjectRecord.payPerHour
    return hoursWorked * payPerHour
}

function allWagesFor(employeeObjectRecord) {
    const datesArray = employeeObjectRecord.timeInEvents
    let total = 0
    datesArray.forEach(obj => {
        total += wagesEarnedOnDate(employeeObjectRecord, obj.date)
    })
    return total
}

function calculatePayroll(arrayOfEmp) {
    let payRollTotal = 0
    arrayOfEmp.forEach(obj => {
        payRollTotal += allWagesFor(obj)
    })
    return payRollTotal
}
