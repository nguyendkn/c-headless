'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <Button onClick={signOut} variant='outline'>
            Đăng xuất
          </Button>
        </div>
        
        <div className='grid gap-6'>
          <div className='bg-card p-6 rounded-lg border'>
            <h2 className='text-xl font-semibold mb-4'>Chào mừng!</h2>
            <p className='text-muted-foreground'>
              Bạn đã đăng nhập thành công. Đây là trang dashboard được bảo vệ bởi authentication middleware.
            </p>
            <div className='mt-4'>
              <p className='text-sm'>
                <strong>Trạng thái xác thực:</strong> {isAuthenticated ? '✅ Đã xác thực' : '❌ Chưa xác thực'}
              </p>
            </div>
          </div>
          
          <div className='bg-card p-6 rounded-lg border'>
            <h3 className='text-lg font-semibold mb-2'>Tính năng middleware</h3>
            <ul className='text-sm text-muted-foreground space-y-1'>
              <li>• Kiểm tra Authorization header với Bearer token</li>
              <li>• Verify JWT token với secret từ environment variables</li>
              <li>• Redirect đến /auth/sign-in nếu token không hợp lệ</li>
              <li>• Cho phép truy cập nếu token hợp lệ</li>
              <li>• Exclude auth routes và public routes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
