export interface JwtPayload {
    sid?: string;  
    email?: string; 
    name?: string;  
    jti?: string;   
    exp?: number;   
}
