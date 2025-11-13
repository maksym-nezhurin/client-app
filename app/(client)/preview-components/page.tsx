'use client';

import { useState } from 'react';
import { 
  Button as ReeloButton, 
  Input as ReeloInput,
  Card as ReeloCard,
  Modal as ReeloModal
} from '@reelo/ui';

export default function PreviewComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">UI Components Preview</h1>
        
        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Variants</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <ReeloButton variant="primary">Primary</ReeloButton>
              <ReeloButton variant="secondary">Secondary</ReeloButton>
              <ReeloButton variant="danger">Danger</ReeloButton>
              <ReeloButton variant="outline">Outline</ReeloButton>
              <ReeloButton variant="ghost">Ghost</ReeloButton>
              <ReeloButton disabled>Disabled</ReeloButton>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <ReeloButton size="sm">Small</ReeloButton>
              <ReeloButton size="default">Default</ReeloButton>
              <ReeloButton size="lg">Large</ReeloButton>
              <ReeloButton size="icon">🔍</ReeloButton>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4">Combinations</h3>
            <div className="flex flex-wrap gap-4">
              <ReeloButton variant="primary" size="sm">Primary Small</ReeloButton>
              <ReeloButton variant="danger" size="lg">Danger Large</ReeloButton>
              <ReeloButton variant="outline" size="default">Outline Default</ReeloButton>
              <ReeloButton variant="ghost" size="sm">Ghost Small</ReeloButton>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Inputs</h2>
          
          <div className="space-y-4 max-w-md">
            <ReeloInput
              label="Default Input"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ReeloInput
              label="Required Input"
              placeholder="This is required"
              required
            />
            <ReeloInput
              label="Input with Error"
              placeholder="This has an error"
              error="This field is required"
            />
            <ReeloInput
              label="Disabled Input"
              placeholder="Disabled input"
              disabled
              value="Disabled value"
            />
            <ReeloInput
              label="Small Input"
              placeholder="Small size"
              size="sm"
            />
            <ReeloInput
              label="Large Input"
              placeholder="Large size"
              size="lg"
            />
            <ReeloInput
              label="Input with Helper Text"
              placeholder="Enter your email"
              helperText="We'll never share your email with anyone else."
            />
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Cards</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <ReeloCard 
              title="Default Card" 
              description="This is a default card with title and description."
            />
            <ReeloCard 
              title="Elevated Card" 
              description="Card with elevated variant for more emphasis."
              variant="elevated"
            />
            <ReeloCard 
              title="Outlined Card" 
              description="Card with outlined variant."
              variant="outlined"
            />
            <ReeloCard 
              title="Card with Footer" 
              description="Card that includes a footer with action buttons."
              footer={
                <div className="flex gap-2">
                  <ReeloButton size="sm" variant="outline">Cancel</ReeloButton>
                  <ReeloButton size="sm">Action</ReeloButton>
                </div>
              }
            />
            <ReeloCard 
              title="Clickable Card" 
              description="Click me to see the interaction!"
              variant="elevated"
              onClick={() => alert('Card clicked!')}
            />
            <ReeloCard 
              title="Custom Padding" 
              description="Card with custom padding settings."
              padding="sm"
            />
          </div>
        </section>

        {/* Modal Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Modal</h2>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <ReeloButton onClick={() => setIsModalOpen(true)}>
              Open Modal
            </ReeloButton>
          </div>

          <ReeloModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Test Modal"
            footer={
              <>
                <ReeloButton variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </ReeloButton>
                <ReeloButton onClick={() => setIsModalOpen(false)}>
                  Confirm
                </ReeloButton>
              </>
            }
          >
            <p className="mb-4">This is a modal dialog. You can add any content here.</p>
            <ReeloInput
              label="Modal Input"
              placeholder="Input inside modal"
            />
          </ReeloModal>
        </section>
      </div>
    </main>
  );
}
