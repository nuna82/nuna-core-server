import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded_user_data = this.jwtService.verify(token);
      request['user'] = decoded_user_data;
      return true;
    } catch (err) {
      return false;
    }
    return true;
  }
}
