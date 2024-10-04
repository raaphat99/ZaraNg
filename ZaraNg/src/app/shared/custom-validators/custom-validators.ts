import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(" ") >=0 ) 
            return { noWhiteSpace: true };
        return null;
    }

    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value == "raaphat99")
                    resolve({ shouldBeUnique: true});
                else
                    resolve(null);
            }, 2000);
        });
    }

    static invalidCurrentPassword(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value !== "1234")
                    resolve({ invalidCurrentPassword: true });
                else 
                    resolve(null);
            }, 1000);
        })
    }

    static passwordsShouldMatch(control : AbstractControl) : ValidationErrors | null {
        let newPassword = control.get("newPassword")?.value;
        let passwordConfirmation = control.get("passwordConfirmation")?.value;
        
        if (newPassword !== passwordConfirmation)
            return { passwordsShouldMatch : true }
        else 
            return null;
    }

}
