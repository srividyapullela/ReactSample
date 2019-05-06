
class ValidateUtil {

  static onlyNumbers(input) {

      let onlyNumbersPattern = '^(0|[0-9][0-9]*)$';
      var re = new RegExp(onlyNumbersPattern);
      return re.test(input)?input:"";
  }

  static onlyLetters(input){

      let onlyLettersPattern = '^([\ ]*[a-zA-Z]+[\ ]*)+$';
      var re = new RegExp(onlyLettersPattern);
      return re.test(input)?input:"";
  }

  static onlyAplhaNumeric(input) {

      let alphaNumericPattern = '^[a-zA-Z0-9]+$';
      var re = new RegExp(alphaNumericPattern);
      return re.test(input)?input:"";
  }

  static validateEmail(input) {
      let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
      var re = new RegExp(emailPattern);
      return re.test(input);
  }

}

export default ValidateUtil;
