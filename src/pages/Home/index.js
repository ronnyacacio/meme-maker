import React, { useState, useEffect } from 'react';
import qs from 'qs';

import api from '../../services/api';
import logo from '../../images/logo.svg';

import { Wrapper, Card, Templates, Form, Button } from './styles';

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState('');

  useEffect(() => {
    (async () => {
      const response = await api.get('get_memes');

      const {
        data: {
          data: { memes },
        },
      } = response;

      setTemplates(memes);
    })();
  }, []);

  const handleInputChange = (index) => (e) => {
    const newBoxes = boxes;
    newBoxes[index] = e.target.value;
    setBoxes(newBoxes);
  };

  function handleSelectTemplate(template) {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: 'ronnyacacio',
      password: 'ronny1324',
      boxes: boxes.map((text) => ({ text })),
    });

    const response = await api.post(`caption_image?${params}`);

    const {
      data: {
        data: { url },
      },
    } = response;

    setGeneratedMeme(url);
  }

  function handleReset() {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme('');
  }

  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker" />
      <Card>
        {generatedMeme ? (
          <main>
            <img src={generatedMeme} alt="Meme" />
            <Button type="button" onClick={handleReset}>
              Criar outro meme
            </Button>
          </main>
        ) : (
          <>
            <h2>Selecione um template</h2>
            <Templates>
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className={
                    template.id === selectedTemplate?.id ? 'selected' : ''
                  }
                >
                  <img src={template.url} alt={template.name} />
                </button>
              ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Textos</h2>
                <Form onSubmit={handleSubmit}>
                  {new Array(selectedTemplate.box_count)
                    .fill('')
                    .map((_, index) => (
                      <input
                        key={index}
                        placeholder={`Texto #${index + 1}`}
                        onChange={handleInputChange(index)}
                      />
                    ))}

                  <Button type="submit">Make My Meme!</Button>
                </Form>
              </>
            )}
          </>
        )}
      </Card>
    </Wrapper>
  );
}
