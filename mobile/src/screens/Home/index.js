import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import qs from 'qs';

import api from '../../services/api';
import logo from '../../assets/logo.png';

import {
  Wrapper,
  Container,
  Header,
  Img,
  Templates,
  Template,
  TemplateImg,
  TemplateButton,
  TemplateButtonText,
  InputCard,
  InputCardTitle,
  Input,
  SubmitButton,
  SubmitButtonText,
  MemeContainer,
  Meme,
  ButtonContainer,
  ButtonMeme,
  ButtonText,
} from './styles';

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

  function handleInputChange(index, text) {
    const newBoxes = boxes;
    newBoxes[index] = text;
    setBoxes(newBoxes);
  }

  function handleSelectTemplate(template) {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  async function handleSubmit() {
    const checkBoxes = boxes.filter((boxe) => boxe !== null && boxe !== '');

    if (checkBoxes.length === 0) {
      Alert.alert(
        'Oooops...',
        'É necessário pelo menos 1 texto para o meme ser feito!'
      );
      return;
    }
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

  async function handleDownload() {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Oooops...',
        'Precisamos da sua permisão para realizar o download.'
      );
      return;
    }

    FileSystem.downloadAsync(
      generatedMeme,
      FileSystem.documentDirectory + 'meme.jpg'
    )
      .then(({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert('É isso aí!', 'Seu meme foi salvo!');
      })
      .catch((_) => {
        alert('Erro no download!');
      });

    handleReset();
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <Img source={logo} resizeMode="contain" />
        </Header>
        {generatedMeme ? (
          <MemeContainer>
            <Meme source={{ uri: generatedMeme }} resizeMode="contain" />
            <ButtonContainer>
              <ButtonMeme onPress={handleReset}>
                <AntDesign
                  name="arrowleft"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <ButtonText>Criar outro meme</ButtonText>
              </ButtonMeme>
              <ButtonMeme onPress={handleDownload}>
                <ButtonText>Salvar meme</ButtonText>
                <AntDesign
                  name="download"
                  size={20}
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              </ButtonMeme>
            </ButtonContainer>
          </MemeContainer>
        ) : (
          <>
            <Templates
              horizontal
              showsHorizontalScrollIndicator={false}
              data={templates}
              keyExtractor={(template) => String(template.id)}
              renderItem={({ item }) => (
                <Template>
                  <TemplateImg
                    source={{ uri: item.url }}
                    resizeMode="contain"
                  />
                  <TemplateButton
                    onPress={() => handleSelectTemplate(item)}
                    activeOpacity={0.6}
                    hasSelected={
                      selectedTemplate && selectedTemplate.id === item.id
                    }
                  >
                    <TemplateButtonText>
                      {selectedTemplate && selectedTemplate.id === item.id
                        ? 'Selecionado'
                        : 'Selecionar'}
                    </TemplateButtonText>
                  </TemplateButton>
                </Template>
              )}
            />

            {selectedTemplate && (
              <>
                <InputCard>
                  <InputCardTitle>Textos</InputCardTitle>
                  {new Array(selectedTemplate.box_count)
                    .fill('')
                    .map((_, index) => (
                      <Input
                        key={index}
                        placeholder={`Texto #${index + 1}`}
                        value={boxes[index]}
                        onChangeText={(text) => handleInputChange(index, text)}
                      />
                    ))}
                </InputCard>
                <SubmitButton onPress={handleSubmit} activeOpacity={0.4}>
                  <SubmitButtonText>Make My Meme!</SubmitButtonText>
                </SubmitButton>
              </>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
}
