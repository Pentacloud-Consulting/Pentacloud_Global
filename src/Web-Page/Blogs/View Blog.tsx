"use client";

import React from 'react';
import { BlogConvertedHTML } from './Blog Converted HTML';

export function ViewBlog({ blog }: { blog: any }) {
  return <BlogConvertedHTML blog={blog} />;
}
