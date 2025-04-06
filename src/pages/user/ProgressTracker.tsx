
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, Star, Trophy, Calendar, Clock, ArrowUpRight, 
  Droplet, CheckCircle, RefreshCw, BarChart3, Leaf, Heart
} from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: "Eco Warrior",
    level: 3,
    xp: 350,
    nextLevelXp: 500,
    badges: [
      { name: "Eco Contributor", description: "10+ articles read", icon: <CheckCircle className="h-4 w-4" />, acquired: true },
      { name: "Green Hero", description: "5+ events participated", icon: <Trophy className="h-4 w-4" />, acquired: false },
      { name: "E-Warrior", description: "Top 3 contributor of the month", icon: <Award className="h-4 w-4" />, acquired: false },
    ],
    stats: {
      carbonSaved: 12.8,
      devicesRecycled: 2,
      pointsEarned: 350,
      streakDays: 3
    },
    missions: [
      { name: "Read an article", status: "complete", points: 10 },
      { name: "Scan a device", status: "incomplete", points: 25 },
      { name: "Share progress", status: "incomplete", points: 15 }
    ],
    achievements: [
      { name: "First Scan", description: "Completed your first device scan", date: "2025-03-20", icon: <Star className="h-4 w-4" /> },
      { name: "E-cycler", description: "Recycled your first device", date: "2025-03-25", icon: <Leaf className="h-4 w-4" /> }
    ],
    leaderboard: [
      { position: 1, name: "GreenTech92", points: 1250 },
      { position: 2, name: "EcoWarrior", points: 980 },
      { position: 3, name: "RecycleHero", points: 765 },
      { position: 4, name: "PlanetSaver", points: 702 },
      { position: 5, name: "EarthGuardian", points: 680 }
    ]
  };

  // Calculate percentage for progress bar
  const xpPercentage = (userData.xp / userData.nextLevelXp) * 100;

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracker</h1>
          <p className="text-muted-foreground mt-1">Track your e-waste management journey and achievements</p>
        </div>

        {/* User Level & Avatar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-primary/10 p-6 rounded-full">
                <Award className="h-14 w-14 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-lg font-medium mb-2">Welcome back, {userData.name}!</div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                    Level {userData.level}: Green Trailblazer
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    {userData.streakDays} Day Streak
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>XP: {userData.xp}/{userData.nextLevelXp}</span>
                    <span>{Math.round(xpPercentage)}%</span>
                  </div>
                  <Progress value={xpPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {userData.nextLevelXp - userData.xp} XP needed to reach Level {userData.level + 1}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <BarChart3 className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-2xl font-bold">{userData.stats.carbonSaved} kg</div>
                    <p className="text-muted-foreground text-sm">Carbon Offset</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Leaf className="h-8 w-8 mb-2 text-green-500" />
                    <div className="text-2xl font-bold">{userData.stats.devicesRecycled}</div>
                    <p className="text-muted-foreground text-sm">Devices Recycled</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Award className="h-8 w-8 mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold">{userData.stats.pointsEarned}</div>
                    <p className="text-muted-foreground text-sm">Points Earned</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-8 w-8 mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{userData.stats.streakDays}</div>
                    <p className="text-muted-foreground text-sm">Day Streak</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Earn badges by completing activities and challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userData.badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 flex flex-col items-center text-center ${
                        badge.acquired ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 opacity-70'
                      }`}
                    >
                      <div className={`p-3 rounded-full mb-2 ${
                        badge.acquired ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {badge.icon}
                      </div>
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                      {!badge.acquired && <p className="text-xs mt-2 text-blue-600">In progress</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Badges</Button>
              </CardFooter>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>The positive impact you've created so far</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-md">
                  <div className="font-medium text-green-800 mb-2 flex items-center">
                    <Droplet className="h-4 w-4 mr-2" />
                    Carbon Offset: {userData.stats.carbonSaved} kg CO₂
                  </div>
                  <div className="text-sm text-green-700">
                    That's equivalent to skipping 35 car rides! Keep up the good work.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Missions</CardTitle>
                <CardDescription>Complete these missions to earn XP and keep your streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.missions.map((mission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {mission.status === 'complete' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                        )}
                        <div>
                          <div className="font-medium">{mission.name}</div>
                          <div className="text-xs text-muted-foreground">+{mission.points} XP</div>
                        </div>
                      </div>
                      {mission.status === 'incomplete' && (
                        <Button variant="outline" size="sm">Complete</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Missions refresh in: 
                  <span className="font-medium ml-1 text-primary">14:25:31</span>
                </div>
                <Button size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenges</CardTitle>
                <CardDescription>More challenging tasks with greater rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Recycle 3 devices this week</h3>
                      <Badge>150 XP</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Progress: 1/3 devices
                    </p>
                    <Progress value={33.3} className="h-2 mt-2" />
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Share 2 awareness articles</h3>
                      <Badge>100 XP</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Progress: 0/2 articles
                    </p>
                    <Progress value={0} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Milestones and special recognitions you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Earned on: {achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  You've earned 2 out of 25 available achievements
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Achievements</CardTitle>
                <CardDescription>These are within your reach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="bg-gray-200 p-2 rounded-full text-gray-500">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Environmental Hero</h3>
                      <p className="text-sm text-muted-foreground">Recycle 5 devices total</p>
                      <div className="flex items-center mt-2">
                        <Progress value={40} className="h-2 flex-1 mr-3" />
                        <span className="text-xs font-medium">2/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Leaderboard</CardTitle>
                <CardDescription>See where you stand among other eco-warriors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.leaderboard.map((user, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        user.name === "EcoWarrior" ? "bg-primary/5 border-primary/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          user.position === 1 ? "bg-yellow-100 text-yellow-700" :
                          user.position === 2 ? "bg-gray-100 text-gray-700" :
                          user.position === 3 ? "bg-orange-100 text-orange-700" :
                          "bg-primary/10 text-primary"
                        }`}>
                          {user.position}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          {user.name === "EcoWarrior" && <div className="text-xs text-primary">You</div>}
                        </div>
                      </div>
                      <div className="font-medium">{user.points.toLocaleString()} pts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Leaderboard</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Friend Challenges</CardTitle>
                <CardDescription>Compete with friends for eco-achievements</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-6">
                <div className="mb-4">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                  <p className="text-muted-foreground">You haven't added any friends yet</p>
                </div>
                <Button>Add Friends</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProgressTracker;
