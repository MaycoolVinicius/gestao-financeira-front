import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const toast = inject(ToastrService);

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  toast.warning('Faça login para acessar');

  router.navigate(['/login']);

  return false;
};