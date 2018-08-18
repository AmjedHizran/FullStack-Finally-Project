import { ValidatorFn , AbstractControl} from '@angular/forms';
import { ValidConfig} from './../validators/validConfig.model';
import {ValidationRules} from './../validators/constConfig';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';

export class LoginUser {

constructor(public userName: string,
            public userPassword: string) {}


            static get userNameValidators(): ValidatorFn[] {
                return [
                    // TODO: add english chars validation
                    ValidConfig.required('User name is requierd'),
                    ValidConfig.minLength(ValidationRules.MIN_CHARS_USER_NAME,
                    `User name can't be shorter than ${ValidationRules.MIN_CHARS_USER_NAME} chars.`),
                    ValidConfig.maxLength(ValidationRules.MAX_CHARS_USER_NAME,
                    `User name  can't exceeds  ${ValidationRules.MAX_CHARS_USER_NAME} chars.`)
                ];
            }


            static get userPasswordValidators(): ValidatorFn[] {
                return [
                    // TODO: add (english chars / numbesr / * ) validation
                    ValidConfig.required('Password is requierd'),
                    ValidConfig.minLength(ValidationRules.MIN_CHARS_USER_PASSWORD,
                            `Password can't be shorter than ${ValidationRules.MIN_CHARS_USER_PASSWORD} chars.`),
                    ValidConfig.maxLength(ValidationRules.MAX_CHARS_USER_PASSWORD,
                            `Password can't exceeds  ${ValidationRules.MAX_CHARS_USER_PASSWORD} chars.`)
                ];
            }
}
