
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, FileText, Video, Award, ExternalLink, Clock, Bookmark, CheckCircle } from 'lucide-react';

const AwarenessHub: React.FC = () => {
  const { t } = useLanguage();

  const articles = [
    {
      id: 1,
      title: 'Understanding E-Waste: Types and Impact',
      description: 'Learn about different types of electronic waste and their environmental impact',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      readTime: '5 min read',
      category: 'Education',
      date: 'Mar 15, 2025',
    },
    {
      id: 2,
      title: 'How to Prepare Your E-Waste for Recycling',
      description: 'A step-by-step guide to properly prepare your electronic devices for recycling',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      readTime: '7 min read',
      category: 'How-to',
      date: 'Mar 10, 2025',
    },
    {
      id: 3,
      title: 'The Hidden Value in Your Old Electronics',
      description: 'Discover the valuable materials inside your outdated devices',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      readTime: '6 min read',
      category: 'Education',
      date: 'Mar 5, 2025',
    },
    {
      id: 4,
      title: 'E-Waste Management Regulations in India',
      description: 'An overview of the legal framework governing e-waste disposal in India',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      readTime: '8 min read',
      category: 'Policy',
      date: 'Feb 28, 2025',
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'Inside an E-Waste Recycling Facility',
      description: 'Take a tour of a modern electronic waste recycling facility',
      thumbnail: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      duration: '12:34',
      category: 'Documentary',
      date: 'Mar 20, 2025',
    },
    {
      id: 2,
      title: 'How to Safely Dispose of Batteries',
      description: 'A practical guide to properly handle and recycle different types of batteries',
      thumbnail: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      duration: '8:15',
      category: 'Tutorial',
      date: 'Mar 12, 2025',
    },
    {
      id: 3,
      title: 'The Future of Sustainable Electronics',
      description: 'Experts discuss innovations in eco-friendly electronic design',
      thumbnail: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      duration: '18:45',
      category: 'Interview',
      date: 'Mar 5, 2025',
    },
  ];

  const courses = [
    {
      id: 1,
      title: 'E-Waste Management Fundamentals',
      description: 'A beginner-friendly course covering the basics of e-waste handling',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      duration: '2 hours',
      modules: 5,
      certificate: true,
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Sustainable Electronics: Repair & Reuse',
      description: 'Learn how to extend the life of electronic devices through repair and refurbishment',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      duration: '3.5 hours',
      modules: 8,
      certificate: true,
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'Circular Economy for Electronics',
      description: 'Advanced concepts in creating sustainable lifecycle for electronic products',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
      duration: '4 hours',
      modules: 6,
      certificate: true,
      level: 'Advanced',
    },
  ];

  const ArticleCard = ({ article }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-video relative">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2">{article.category}</Badge>
      </div>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {article.readTime}
          <span className="mx-2">•</span>
          {article.date}
        </div>
        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
        <p className="text-muted-foreground">{article.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          <FileText className="mr-2 h-4 w-4" />
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );

  const VideoCard = ({ video }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-video relative group cursor-pointer">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="h-6 w-6 text-primary fill-primary ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
          {video.duration}
        </div>
        <Badge className="absolute top-2 right-2">{video.category}</Badge>
      </div>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          {video.date}
        </div>
        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
        <p className="text-muted-foreground">{video.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          <Video className="mr-2 h-4 w-4" />
          Watch Video
        </Button>
      </CardFooter>
    </Card>
  );

  const CourseCard = ({ course }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-video relative">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2">{course.level}</Badge>
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-muted-foreground mb-4">{course.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="flex items-center text-sm bg-muted px-2 py-1 rounded-full">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center text-sm bg-muted px-2 py-1 rounded-full">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {course.modules} modules
          </div>
          {course.certificate && (
            <div className="flex items-center text-sm bg-muted px-2 py-1 rounded-full">
              <Award className="h-3.5 w-3.5 mr-1" />
              Certificate
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          Start Course
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.awareness')}</h1>
          <p className="text-muted-foreground mt-1">Learn about e-waste management and sustainable practices</p>
        </div>

        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">E-Waste Education Center</h2>
                <p className="mb-4">
                  Access educational resources to learn about responsible e-waste disposal, 
                  sustainable practices, and the environmental impact of electronic devices.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white/20 hover:bg-white/30 border-white/10">
                    <FileText className="h-3.5 w-3.5 mr-1" /> Articles
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 hover:bg-white/30 border-white/10">
                    <Video className="h-3.5 w-3.5 mr-1" /> Videos
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 hover:bg-white/30 border-white/10">
                    <BookOpen className="h-3.5 w-3.5 mr-1" /> Courses
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 hover:bg-white/30 border-white/10">
                    <Award className="h-3.5 w-3.5 mr-1" /> Certificates
                  </Badge>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png" 
                  alt="E-waste education" 
                  className="max-h-32 object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="articles">
          <TabsList className="mb-6">
            <TabsTrigger value="articles" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex-1">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View More Articles
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View More Videos
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                Explore All Courses
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>E-Waste Quick Facts</CardTitle>
            <CardDescription>Important statistics about e-waste</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">50M+</div>
                <div className="text-sm text-muted-foreground">Tons of e-waste generated annually worldwide</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">20%</div>
                <div className="text-sm text-muted-foreground">Of e-waste is properly recycled globally</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">$62.5B</div>
                <div className="text-sm text-muted-foreground">Value of materials in global e-waste annually</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">₹10,000</div>
                <div className="text-sm text-muted-foreground">Fine for improper e-waste disposal in India</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AwarenessHub;
