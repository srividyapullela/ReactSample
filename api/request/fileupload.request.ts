import { BaseRequest } from './base.request'

export class FileUploadRequest extends BaseRequest{

promocode:string;
displayName:string;
uploadDate:string;
fileName:string;
userName:string;
businessName:string;
file: Buffer;
strCompanycode:string;
}
