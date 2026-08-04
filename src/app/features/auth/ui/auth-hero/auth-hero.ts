import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthLogo } from '../auth-logo/auth-logo';

@Component({
  selector: 'app-auth-hero',
  imports: [AuthLogo],
  templateUrl: './auth-hero.html',
  styleUrl: './auth-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthHero {}
