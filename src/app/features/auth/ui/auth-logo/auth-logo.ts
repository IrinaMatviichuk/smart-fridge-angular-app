import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-logo',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './auth-logo.html',
  styleUrl: './auth-logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLogo {}
