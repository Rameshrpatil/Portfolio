-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create a table to store your resume knowledge chunks
create table if not exists public.portfolio_knowledge (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  -- We use 768 dimensions because Google's text-embedding-004 produces 768-dimensional vectors
  embedding vector(768) not null
);

-- Create a function to search for documents
-- This uses cosine similarity (<=>) which is standard for embeddings
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  similarity float
)
language sql stable
as $$
  select
    portfolio_knowledge.id,
    portfolio_knowledge.content,
    1 - (portfolio_knowledge.embedding <=> query_embedding) as similarity
  from portfolio_knowledge
  where 1 - (portfolio_knowledge.embedding <=> query_embedding) > match_threshold
  order by portfolio_knowledge.embedding <=> query_embedding
  limit match_count;
$$;
