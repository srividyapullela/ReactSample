import { Request, Response, NextFunction } from 'express';
import { FormUploadHelper } from '../helper/form.upload.helper';

export class UploadFormController {

    public formUpload(req: Request, res: Response, next: NextFunction) {
        
        var formUploadHelper = new FormUploadHelper();
        formUploadHelper.uploadForm(req).then(s => res.json(s));
    }

}
