class codesController{
    static generateCode = () => {

        const min = 100000; // Minimum 6-digit number
        const max = 999999; // Maximum 6-digit number

        // Generate a random number between min and max
        let randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

        randomCode = randomCode.toString();

        return randomCode
    }
}

module.exports = codesController;
