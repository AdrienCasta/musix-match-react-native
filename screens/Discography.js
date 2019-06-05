import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Platform
} from "react-native";
import { Block, Text, theme, Card } from "galio-framework";
import { LinearGradient } from "expo";

import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import { Selectors as ArtistsSelectors } from "../redux/artistsRedux";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class Discography extends React.Component {
  _renderDiscography = ({ item: { album } }) => {
    const { album_name, artist_name, album_release_date } = album;
    const fromattedDate = new Date(album_release_date).getFullYear();
    const _renderTitle = <Text>{`${album_name} (${fromattedDate})`}</Text>;
    return <Card title={_renderTitle} caption={artist_name} />;
  };
  _renderAllDiscography = discographyData => {
    const keyExtractor = ({ album: { album_id } }) => "" + album_id;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.discography}
      >
        <Block flex>
          <FlatList
            data={discographyData}
            renderItem={this._renderDiscography}
            keyExtractor={keyExtractor}
          />
        </Block>
      </ScrollView>
    );
  };
  render() {
    const { artistDiscography } = this.props;

    return (
      <Block flex center style={styles.home}>
        <Text>{artistDiscography.error}</Text>
        {artistDiscography.fetching ? (
          <Text>loading</Text>
        ) : (
          this._renderAllDiscography(artistDiscography.data)
        )}
      </Block>
    );
  }
}

const mapStateToProps = state => ({
  artistDiscography: ArtistsSelectors.getDiscography(state)
});

export default connect(mapStateToProps)(Discography);

const styles = StyleSheet.create({
  discography: {
    width: width,
    marginTop: 100
  }
});
