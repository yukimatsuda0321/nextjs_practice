'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  return (
    <Card className="w-full max-w-md mx-auto mt-24">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</Label>
            <Input id="email" type="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">ログイン</Button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <div className="text-red-500">
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}