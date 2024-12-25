import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z ]+$/;

export class UserDTO {
  @IsNotEmpty()
  @Matches(nameRegex, {
    message: 'Name should be a string of alphabets',
  })
  name: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegex, {
    message:
      'Use Min 8 characters, at least one letter, one number and one special character',
  })
  password: string;
}
