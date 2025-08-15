'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Session } from '@/shared/types/session';
import {
  CreditCard,
  Monitor,
  MoreHorizontal,
  Plus,
  Settings,
  Shield,
  User,
} from 'lucide-react';

import { useState } from 'react';

interface Props {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  user: Session;
}

export function UserSettings({
  isSettingsOpen,
  setIsSettingsOpen,
  user,
}: Props) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogContent className='!max-w-4xl w-full h-[65vh] overflow-hidden p-0'>
        <DialogTitle className='sr-only'>Account Settings</DialogTitle>
        <DialogDescription className='sr-only'>
          Manage your account settings, security preferences, and billing
          information.
        </DialogDescription>
        <div className='flex flex-col sm:flex-row h-full'>
          {/* Sidebar */}
          <div className='flex flex-col justify-start items-start h-full gap-96 pl-3 pr-5 pt-6 pb-4 bg-muted/30'>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pb-20'>
              <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-px px-3'>
                <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                  <p className='self-stretch flex-grow-0 flex-shrink-0 w-44 text-lg font-semibold text-left text-foreground'>
                    Account
                  </p>
                </div>
                <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                  <p className='self-stretch flex-grow-0 flex-shrink-0 w-44 text-sm text-left text-muted-foreground'>
                    Manage your account info.
                  </p>
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                orientation='vertical'
                className='w-full flex-1'
              >
                <TabsList className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-0.5 bg-transparent p-0'>
                  <TabsTrigger
                    value='profile'
                    className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3 pl-3 pr-28 py-1.5 rounded-md data-[state=active]:bg-muted/50 data-[state=inactive]:bg-transparent w-full'
                  >
                    <User
                      className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
                      color={
                        activeTab === 'profile'
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--muted-foreground))'
                      }
                    />
                    <div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                      <p
                        className={`flex-grow-0 flex-shrink-0 text-sm font-medium text-center ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        Profile
                      </p>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value='security'
                    className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3 pl-3 pr-24 py-1.5 rounded-md data-[state=active]:bg-muted/50 data-[state=inactive]:bg-transparent w-full'
                  >
                    <Shield
                      className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
                      color={
                        activeTab === 'security'
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--muted-foreground))'
                      }
                      style={{ opacity: activeTab === 'security' ? 1 : 0.7 }}
                    />
                    <div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                      <p
                        className={`flex-grow-0 flex-shrink-0 text-sm font-medium text-center ${activeTab === 'security' ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        Security
                      </p>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value='preferences'
                    className='flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3 pl-3 pr-20 py-1.5 rounded-md data-[state=active]:bg-muted/50 data-[state=inactive]:bg-transparent w-full'
                  >
                    <Settings
                      className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
                      color={
                        activeTab === 'preferences'
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--muted-foreground))'
                      }
                      style={{ opacity: 0.7 }}
                    />
                    <div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                      <p
                        className={`flex-grow-0 flex-shrink-0 text-sm font-medium text-center ${activeTab === 'preferences' ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        Preferences
                      </p>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 flex flex-col h-full'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='flex flex-col h-full'
            >
              <TabsContent
                value='profile'
                className='flex-1 overflow-y-auto p-6 mt-0'
              >
                <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 max-w-2xl relative'>
                  <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 pb-4'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative pb-1'>
                      <p className='self-stretch flex-grow-0 flex-shrink-0 max-w-2xl text-base font-medium text-left text-foreground'>
                        Profile details
                      </p>
                    </div>
                  </div>
                  <div className='self-stretch flex-grow-0 flex-shrink-0 h-24 relative border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start w-96 h-14 absolute left-48 top-4'>
                      <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 pl-2.5 pr-1 py-1'>
                        <div className='flex flex-row-reverse justify-start items-center flex-grow-0 flex-shrink-0 gap-4'>
                          <div className='flex flex-col justify-center items-start flex-grow-0 flex-shrink-0'>
                            <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative'>
                              <div className='flex-grow-0 flex-shrink-0 w-36 h-5 relative overflow-hidden'>
                                <p className='w-36 h-5 absolute left-0 top-0 text-sm font-medium text-left text-foreground'>
                                  {user?.name || 'User'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-center items-start flex-grow-0 flex-shrink-0'>
                            <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-12 h-12 relative overflow-hidden rounded-3xl bg-muted'>
                              <div className="self-stretch flex-grow w-12 h-12 relative overflow-hidden bg-[url('đào-khôi-nguyên-khoi's-logo.png')]" />
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative pl-2.5 pr-3 pt-1 pb-2 rounded-md'>
                          <Button variant='outline' size='sm'>
                            Update profile
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start w-44 absolute left-0 top-2 pt-7'>
                      <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44'>
                        <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                          <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                            <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                              Profile
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow'>
                      <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-0.5'>
                        <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 pl-2.5 pr-1 py-1'>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-1'>
                            <div className='self-stretch flex-grow-0 flex-shrink-0 w-40 relative overflow-hidden'>
                              <p className='w-40 h-5 absolute left-0 top-0 text-sm text-left text-foreground'>
                                {user?.email || 'user@example.com'}
                              </p>
                            </div>
                            <div className='flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 p-px'>
                              <div className='flex justify-center items-center flex-grow relative px-1.5 py-px rounded bg-muted/30'>
                                <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-muted-foreground border px-2 rounded-sm'>
                                  Primary
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-center items-center flex-grow-0 flex-shrink-0 relative opacity-60 p-0.5 rounded-md'>
                            <MoreHorizontal
                              className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
                              color='hsl(var(--foreground))'
                            />
                          </div>
                        </div>
                        <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-8 gap-1 pl-2.5 pr-3 py-1.5 rounded-md'>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative pr-1'>
                            <Plus
                              size={17}
                              className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
                            />
                          </div>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 overflow-hidden'>
                            <div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden'>
                              <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center'>
                                Add email address
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Email addresses
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow'>
                      <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-8 gap-1 pl-2.5 pr-3 py-1.5 rounded-md'>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative pr-1'>
                            <Plus
                              size={17}
                              className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
                            />
                          </div>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 overflow-hidden'>
                            <div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden'>
                              <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center'>
                                Add phone number
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Phone numbers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow'>
                      <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-0'>
                        <div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 pl-2.5 pr-1 py-1'>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2'>
                            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-4 overflow-hidden'>
                              <div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-5 w-4 relative overflow-hidden py-0.5'>
                                <div className='flex justify-center items-center w-4 h-4 rounded-sm bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 text-white text-xs font-bold'>
                                  G
                                </div>
                              </div>
                            </div>
                            <div className='self-stretch flex-grow-0 flex-shrink-0 w-56 relative overflow-hidden'>
                              <div className='flex justify-center items-center absolute left-0 top-0 gap-1'>
                                <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative'>
                                  <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-foreground'>
                                    Google
                                  </p>
                                </div>
                                <div className='flex-grow-0 flex-shrink-0 w-44 h-5 relative overflow-hidden'>
                                  <p className='w-44 h-5 absolute left-0 top-0 text-sm text-left text-muted-foreground'>
                                    • {user?.email || 'user@example.com'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-center items-center flex-grow-0 flex-shrink-0 relative opacity-60 p-0.5 rounded-md'>
                            <MoreHorizontal
                              className='flex-grow-0 flex-shrink-0 w-5 h-5 relative'
                              color='hsl(var(--foreground))'
                            />
                          </div>
                        </div>
                        <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                          <div className='flex justify-start items-center flex-grow h-8 gap-1 pl-2.5 pr-3 py-1.5 rounded-md'>
                            <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative pr-1'>
                              <Plus
                                size={17}
                                className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
                              />
                            </div>
                            <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 overflow-hidden'>
                              <div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden'>
                                <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center'>
                                  Connect account
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Connected accounts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value='security'
                className='flex-1 overflow-y-auto p-6 mt-0'
              >
                <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 max-w-2xl relative'>
                  <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 pb-4'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative pb-1'>
                      <p className='self-stretch flex-grow-0 flex-shrink-0 max-w-2xl text-base font-medium text-left text-foreground'>
                        Security
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow'>
                      <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pr-1 py-px'>
                        <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative pl-2.5 pr-3 pt-1 pb-2 rounded-md'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-primary'>
                            Set password
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Password
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow'>
                      <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-8 gap-1 pl-2.5 pr-3 py-1.5 rounded-md'>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative pr-1'>
                            <Plus className='flex-grow-0 flex-shrink-0 w-4 h-4 relative' />
                          </div>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 overflow-hidden'>
                            <div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden'>
                              <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-primary'>
                                Add a passkey
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Passkeys
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex justify-start items-center flex-grow h-8 gap-1 pl-2.5 pr-3 py-1.5 rounded-md'>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative pr-1'>
                            <Plus className='flex-grow-0 flex-shrink-0 w-4 h-4 relative' />
                          </div>
                          <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 overflow-hidden'>
                            <div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden'>
                              <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-primary'>
                                Add two-step verification
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Two-step verification
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row-reverse justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 pt-4 pb-4 border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start self-stretch flex-grow pl-2.5 pr-1 py-1'>
                      <div className='flex justify-start items-end self-stretch flex-grow-0 flex-shrink-0 h-24 overflow-hidden gap-4'>
                        <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative rounded-md'>
                          <Monitor
                            size={20}
                            className='flex-grow-0 flex-shrink-0 size-5 relative'
                          />
                        </div>
                        <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-24 relative gap-1'>
                          <div className='flex justify-center items-center flex-grow-0 flex-shrink-0 gap-2'>
                            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative'>
                              <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-foreground'>
                                Windows
                              </p>
                            </div>
                            <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 p-px'>
                              <div className='flex justify-center items-center flex-grow-0 flex-shrink-0 relative px-1.5 py-px rounded bg-muted/30'>
                                <p className='flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-muted-foreground'>
                                  This device
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-muted-foreground'>
                            Chrome 139.0.0.0
                          </p>
                          <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-muted-foreground'>
                            101.99.12.144 (Hanoi, VN)
                          </p>
                          <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-muted-foreground'>
                            Today at 3:12 PM
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44 pt-1 pb-1.5'>
                      <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                            Active devices
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='self-stretch flex-grow-0 flex-shrink-0 h-20 relative border-t border-r-0 border-b-0 border-l-0 border-border'>
                    <div className='flex flex-col justify-start items-start w-96 absolute left-48 top-4'>
                      <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 p-1'>
                        <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative pl-2.5 pr-3 pt-1 pb-2 rounded-md'>
                          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-destructive'>
                            Delete account
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-start w-44 absolute left-0 top-2 pt-5'>
                      <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-44'>
                        <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
                          <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative'>
                            <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-foreground'>
                              Delete account
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value='billing'
                className='flex-1 overflow-y-auto p-6 mt-0'
              >
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-lg font-semibold text-gray-900 mb-1'>
                      Billing information
                    </h2>
                  </div>

                  <div className='space-y-6'>
                    <div className='p-6 bg-gray-50 rounded-lg text-center'>
                      <div className='mb-4'>
                        <CreditCard className='w-12 h-12 mx-auto text-gray-400' />
                      </div>
                      <h3 className='text-base font-medium text-gray-900 mb-2'>
                        No billing information
                      </h3>
                      <p className='text-sm text-gray-600 mb-4'>
                        You haven&apos;t added any payment methods yet.
                      </p>
                      <Button
                        variant='outline'
                        className='text-blue-600 border-blue-200 hover:bg-blue-50'
                      >
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value='preferences'
                className='flex-1 overflow-y-auto p-6 mt-0'
              >
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-lg font-semibold text-gray-900 mb-1'>
                      Preferences
                    </h2>
                  </div>

                  <div className='space-y-6'>
                    <div className='p-6 bg-gray-50 rounded-lg text-center'>
                      <div className='mb-4'>
                        <CreditCard className='w-12 h-12 mx-auto text-gray-400' />
                      </div>
                      <h3 className='text-base font-medium text-gray-900 mb-2'>
                        No preferences configured
                      </h3>
                      <p className='text-sm text-gray-600 mb-4'>
                        Configure your application preferences here.
                      </p>
                      <Button
                        variant='outline'
                        className='text-blue-600 border-blue-200 hover:bg-blue-50'
                      >
                        Configure Preferences
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
