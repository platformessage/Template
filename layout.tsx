import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Home, Folder, User, Settings } from "lucide-react"

export default function AppWithInputs() {
  const [activeTab, setActiveTab] = useState('home')
  const [homeInput, setHomeInput] = useState('')
  const [projectInput, setProjectInput] = useState('')
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: null as File | null
  })
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en'
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === 'avatar' && files) {
      setProfile({...profile, avatar: files[0]})
    } else {
      setProfile({...profile, [name]: value})
    }
  }

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Home Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="homeInput">Enter your home note</Label>
                  <Input
                    id="homeInput"
                    value={homeInput}
                    onChange={(e) => setHomeInput(e.target.value)}
                    placeholder="Type something for your home section..."
                  />
                </div>
                {homeInput && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium">Your Note:</h3>
                    <p>{homeInput}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      case 'project':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectInput">Project Name</Label>
                  <Input
                    id="projectInput"
                    value={projectInput}
                    onChange={(e) => setProjectInput(e.target.value)}
                    placeholder="Enter project name..."
                  />
                </div>
                {projectInput && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium">Project Preview:</h3>
                    <p>Creating project: {projectInput}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      case 'profile':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {profile.avatar ? (
                      <img 
                        src={URL.createObjectURL(profile.avatar)} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    )}
                    <Label 
                      htmlFor="avatarUpload"
                      className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 cursor-pointer"
                    >
                      Change
                    </Label>
                    <Input
                      id="avatarUpload"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleProfileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 'settings':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleSettingsChange}
                    className="block w-full p-2 border rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleSettingsChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="notifications">Enable Notifications</Label>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={handleSettingsChange}
                    className="block w-full p-2 border rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button className="w-full">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My App</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('home')}
            className="flex-1 flex-col h-auto py-3"
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={activeTab === 'project' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('project')}
            className="flex-1 flex-col h-auto py-3"
          >
            <Folder className="h-5 w-5 mb-1" />
            <span className="text-xs">Projects</span>
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex-1 flex-col h-auto py-3"
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="flex-1 flex-col h-auto py-3"
          >
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  )
}
