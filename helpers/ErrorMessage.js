module.exports = ErrorMessage = (error,status,res) => {
    console.log('in error')
    console.log(error)
    if(error.username){
        return res.status(status).send({
            success : false,
            error : error.username.message
        })
    }
    if(error.email){
        return res.status(status).send({
            success : false,
            error : error.email.message
        })
    }
    if(error.password){
        return res.status(status).send({
            success : false,
            error : error.password.message
        })
    }
}