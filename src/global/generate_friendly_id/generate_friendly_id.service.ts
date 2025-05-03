import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenerateFriendlyIdService {
  generate(title: string) {
    let base_url = title
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9]/g, '_');
    let id = uuidv4();
    let friendly_id = `${base_url}_${id}`;
    return friendly_id;
  }
}
