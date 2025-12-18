import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetailPage from './page';
import { getProductById, getProducts } from '@/app/services/productService';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/app/context/AuthContext';

// Mock the services
jest.mock('@/app/services/productService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProductDetailPage', () => {
  const mockRouter = {
    back: jest.fn(),
  };
  useRouter.mockReturnValue(mockRouter);

  const product = {
    id: 1,
    nameProducts: 'Test Product',
    pureList: 'Test description',
    stack: 100,
    category: { name: 'Test Category' },
    image: 'test.jpg',
    reference: '123',
    type: 'Test Type',
  };

  const relatedProducts = [
    { id: 2, nameProducts: 'Related Product 1', stack: 200, image: 'related1.jpg' },
    { id: 3, nameProducts: 'Related Product 2', stack: 300, image: 'related2.jpg' },
  ];

  beforeEach(() => {
    getProductById.mockResolvedValue(product);
    getProducts.mockResolvedValue([product, ...relatedProducts]);
  });

  it('renders loading state initially', () => {
    render(
      <AuthProvider>
        <ProductDetailPage params={{ id: '1' }} />
      </AuthProvider>
    );
    expect(screen.getByText('Chargement du produit...')).toBeInTheDocument();
  });

  it('renders product details after loading', async () => {
    render(
      <AuthProvider>
        <ProductDetailPage params={{ id: '1' }} />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });
  });

  it('renders error state if fetching fails', async () => {
    getProductById.mockRejectedValue(new Error('Failed to fetch'));
    render(
      <AuthProvider>
        <ProductDetailPage params={{ id: '1' }} />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });
  });

  it('renders related products', async () => {
    render(
      <AuthProvider>
        <ProductDetailPage params={{ id: '1' }} />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Autres véhicules disponibles')).toBeInTheDocument();
      expect(screen.getByText('Related Product 1')).toBeInTheDocument();
      expect(screen.getByText('Related Product 2')).toBeInTheDocument();
    });
  });
});