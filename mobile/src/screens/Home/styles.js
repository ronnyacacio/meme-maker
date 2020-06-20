import styled from 'styled-components/native';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const Wrapper = styled.View`
  flex: 1;
  background: #eee;
`;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: ${statusBarHeight}px;
`;

export const Header = styled.View`
  height: 70px;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`;

export const Img = styled.Image`
  width: 150px;
`;

export const MemeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  margin: 0 20px;
  background: #f8f8f8;
`;

export const Meme = styled.Image`
  width: 300px;
  height: 300px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 10px;
  margin: 20px 0;
`;

export const ButtonMeme = styled.TouchableOpacity`
  height: 50px;
  padding: 0 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #4395d8;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

export const Templates = styled.FlatList`
  height: 300px;
  padding-left: 20px;
`;

export const Template = styled.View`
  align-items: center;
  justify-content: space-between;

  background: #f8f8f8;
  border-radius: 8px;

  margin-right: 20px;
`;

export const TemplateImg = styled.Image`
  width: 200px;
  height: 200px;

  max-width: 200px;
  max-height: 200px;
`;

export const TemplateButton = styled.TouchableOpacity`
  height: 50px;

  padding: 0 40px;
  margin-bottom: 20px;

  align-items: center;
  justify-content: center;

  background: ${({ hasSelected }) => (hasSelected ? '#08c870' : '#4395d8')};
  border-radius: 4px;
`;

export const TemplateButtonText = styled.Text`
  font-size: 18px;
  color: white;
`;

export const InputCard = styled.View`
  background: #f8f8f8;
  border-radius: 8px;

  margin: 20px 20px 0;
  padding: 10px 20px;
`;

export const InputCardTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #392d2d;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  margin-bottom: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 18px;
  padding: 0 15px;
  height: 50px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 50px;

  margin: 20px;

  align-items: center;
  justify-content: center;

  background: #4395d8;
  border-radius: 8px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
