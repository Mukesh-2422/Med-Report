import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Settings() {
  const { doctor } = useAuth()
  const { notify } = useToast()
  const [notifications, setNotifications] = useState(true)
  const [appearance, setAppearance] = useState('Light')

  return (
    <Layout title="Settings" description="Manage your profile, preferences, and security.">
      <div className="max-w-2xl flex flex-col gap-8">
        <section className="border border-border rounded-sm bg-surface p-6">
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Doctor Name" defaultValue={doctor?.name} />
            <Input label="Email" type="email" defaultValue={doctor?.email} />
            <Input label="Specialty" defaultValue={doctor?.specialty} className="sm:col-span-2" />
          </div>
          <div className="mt-5 flex justify-end">
            <Button size="sm" onClick={() => notify('Profile updated.', 'success')}>
              Save Changes
            </Button>
          </div>
        </section>

        <section className="border border-border rounded-sm bg-surface p-6">
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Preferences</h3>
          <div className="flex flex-col gap-5">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[14px] text-charcoal">Notifications</p>
                <p className="text-[12.5px] text-muted">Receive alerts for cases needing review.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-5 w-5 accent-forest"
              />
            </label>
            <Select label="Appearance" value={appearance} onChange={(e) => setAppearance(e.target.value)}>
              <option>Light</option>
              <option>System</option>
            </Select>
          </div>
        </section>

        <section className="border border-border rounded-sm bg-surface p-6">
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Security</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm Password" type="password" placeholder="••••••••" />
          </div>
          <div className="mt-5 flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => notify('Password updated.', 'success')}>
              Change Password
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}
