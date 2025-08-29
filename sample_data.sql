-- Sample data for Taylor's AI Club database
-- Run this after setting up your database schema

-- Insert sample events
INSERT INTO public.events (id, title, description, starts_at, ends_at, venue, is_online, capacity, tags, image_url, created_by, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'AI Workshop: Getting Started with Machine Learning', 'A beginner-friendly workshop covering the fundamentals of machine learning using Python and scikit-learn.', '2024-02-15 14:00:00+00', '2024-02-15 17:00:00+00', 'Computer Lab 1, Taylor''s University', false, 50, ARRAY['Workshop', 'Beginner', 'Machine Learning'], 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', '550e8400-e29b-41d4-a716-446655440000', 'upcoming'),
('550e8400-e29b-41d4-a716-446655440002', 'Hackathon: AI for Social Good', '48-hour hackathon focusing on building AI solutions for social impact and community challenges.', '2024-02-20 18:00:00+00', '2024-02-22 18:00:00+00', 'Innovation Hub, Taylor''s University', false, 100, ARRAY['Hackathon', 'Competition', 'Social Impact'], 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', '550e8400-e29b-41d4-a716-446655440000', 'upcoming'),
('550e8400-e29b-41d4-a716-446655440003', 'Guest Lecture: Future of AI in Industry', 'Industry expert from Google AI discusses the latest trends and career opportunities in artificial intelligence.', '2024-02-25 16:00:00+00', '2024-02-25 18:00:00+00', 'Auditorium A, Taylor''s University', false, 200, ARRAY['Lecture', 'Industry', 'Career'], 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', '550e8400-e29b-41d4-a716-446655440000', 'upcoming');

-- Insert sample projects
INSERT INTO public.projects (id, title, summary, description, repo_url, demo_url, image_url, tags, owner_id, status) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'AI Chatbot for Student Support', 'Intelligent chatbot to help students with academic queries', 'A comprehensive AI-powered chatbot built with Python and OpenAI''s GPT API. Features include course recommendations, study planning, and 24/7 academic support. The system uses natural language processing to understand student queries and provides personalized responses based on academic data.', 'https://github.com/sample/ai-chatbot', 'https://chatbot-demo.vercel.app', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', ARRAY['NLP', 'Python', 'OpenAI', 'React'], '550e8400-e29b-41d4-a716-446655440000', 'approved'),
('650e8400-e29b-41d4-a716-446655440002', 'Computer Vision Food Recognition', 'Mobile app that identifies food and tracks nutrition', 'Using TensorFlow and CNN models to identify food items from photos and provide nutritional information. Includes calorie tracking and meal planning features. The app can recognize over 1000 different food items with 95% accuracy.', 'https://github.com/sample/food-vision', 'https://food-app-demo.netlify.app', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', ARRAY['Computer Vision', 'TensorFlow', 'Mobile', 'Health'], '550e8400-e29b-41d4-a716-446655440001', 'approved'),
('650e8400-e29b-41d4-a716-446655440003', 'Smart Campus Navigation', 'AR-powered navigation system for university campus', 'Augmented reality navigation app that helps students and visitors navigate the campus. Features include indoor mapping, class scheduling integration, and crowd density visualization. Built using Unity and ARCore.', 'https://github.com/sample/campus-nav', 'https://campus-nav.vercel.app', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400', ARRAY['AR', 'Unity', 'Machine Learning', 'Mobile'], '550e8400-e29b-41d4-a716-446655440002', 'featured');

-- Insert sample resources
INSERT INTO public.resources (id, title, description, type, url, storage_path, tags, created_by) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Machine Learning Fundamentals', 'Complete course covering basics of ML algorithms, supervised and unsupervised learning.', 'Course', 'https://coursera.org/learn/machine-learning', '', ARRAY['Beginner', 'Machine Learning', 'Theory'], '550e8400-e29b-41d4-a716-446655440000'),
('750e8400-e29b-41d4-a716-446655440002', 'PyTorch Tutorial Series', 'Hands-on tutorials for building neural networks with PyTorch framework.', 'Tutorial', 'https://pytorch.org/tutorials/', '', ARRAY['PyTorch', 'Deep Learning', 'Practical'], '550e8400-e29b-41d4-a716-446655440000'),
('750e8400-e29b-41d4-a716-446655440003', 'AI Ethics Guidelines', 'Essential reading on responsible AI development and ethical considerations.', 'Document', '', '/documents/ai-ethics-guide.pdf', ARRAY['Ethics', 'Guidelines', 'Policy'], '550e8400-e29b-41d4-a716-446655440000'),
('750e8400-e29b-41d4-a716-446655440004', 'Computer Vision with OpenCV', 'Workshop materials covering image processing and computer vision basics.', 'Workshop', '', '/materials/cv-workshop.zip', ARRAY['Computer Vision', 'OpenCV', 'Workshop'], '550e8400-e29b-41d4-a716-446655440000');

-- Insert sample partners
INSERT INTO public.partners (id, name, logo_url, website_url, description, perks, is_featured) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'Google AI', 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200', 'https://ai.google', 'Leading technology company providing AI research and development resources.', ARRAY['Cloud Credits', 'Mentorship', 'Internship Opportunities'], true),
('850e8400-e29b-41d4-a716-446655440002', 'Microsoft Azure', 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=200', 'https://azure.microsoft.com', 'Cloud platform offering AI and machine learning services.', ARRAY['Azure Credits', 'Certification Programs', 'Technical Support'], true),
('850e8400-e29b-41d4-a716-446655440003', 'NVIDIA', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200', 'https://nvidia.com', 'Hardware and software solutions for AI and deep learning.', ARRAY['GPU Access', 'Developer Programs', 'Research Collaboration'], false);

-- Insert sample contact messages (for testing admin interface)
INSERT INTO public.contact_messages (id, name, email, subject, message) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'John Doe', 'john.doe@student.taylor.edu.my', 'Joining AI Club', 'Hi, I''m interested in joining the AI club. Could you provide more information about membership requirements?'),
('950e8400-e29b-41d4-a716-446655440002', 'Sarah Smith', 'sarah.smith@company.com', 'Partnership Opportunity', 'We''re a tech startup interested in partnering with your AI club for internship programs.');

-- Insert sample subscriptions
INSERT INTO public.subscriptions (id, email, consent_newsletter) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'member1@student.taylor.edu.my', true),
('a50e8400-e29b-41d4-a716-446655440002', 'member2@student.taylor.edu.my', true),
('a50e8400-e29b-41d4-a716-446655440003', 'member3@student.taylor.edu.my', false);

-- Note: You'll need to manually create user profiles after users sign up through Clerk
-- The user_id should match the Clerk user ID

-- Sample profiles (replace user_id with actual Clerk user IDs)
-- INSERT INTO public.profiles (id, user_id, name, program, grad_year, skills, interests, bio, avatar_url, socials) VALUES
-- ('b50e8400-e29b-41d4-a716-446655440001', 'clerk_user_id_1', 'Alex Chen', 'Computer Science', 2025, ARRAY['Python', 'Machine Learning', 'TensorFlow'], ARRAY['Research', 'Hackathons', 'Open Source'], 'Passionate about AI and machine learning. Love building intelligent systems.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', '{"github": "alexchen", "linkedin": "alex-chen-dev"}');

-- Sample memberships (replace user_id with actual Clerk user IDs)
-- INSERT INTO public.memberships (id, user_id, role) VALUES
-- ('c50e8400-e29b-41d4-a716-446655440001', 'clerk_user_id_1', 'admin'),
-- ('c50e8400-e29b-41d4-a716-446655440002', 'clerk_user_id_2', 'member');

-- To connect with your frontend:
-- 1. Sign up users through Clerk
-- 2. Create corresponding profiles and memberships using the Clerk user IDs
-- 3. Update the created_by and owner_id fields with actual user IDs