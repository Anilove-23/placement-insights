class ApiResponse{
    constructor(statusCode,data,message){
        this.statusCode = statusCode
        this.sucess = statusCode<400
        this.data = data 
        this.message = message
    }
}

export {ApiResponse}