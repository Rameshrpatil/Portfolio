import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Lock } from "lucide-react";
import resumeData from "../data/resume.json";
const { profile } = resumeData;

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold tracking-tight text-foreground">{profile.name}</span>
          <span className="text-sm text-muted-foreground mt-1">BACKEND &amp; APPLIED AI ENGINEER</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground font-medium flex items-center gap-3">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="text-border">|</span>
          <Link to="/login" className="hover:text-primary transition-colors flex items-center gap-1" title="Admin Login">
            <Lock size={12} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
