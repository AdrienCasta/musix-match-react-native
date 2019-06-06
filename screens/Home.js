import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import materialTheme from "../constants/Theme";
import { Block, theme, Card } from "galio-framework";

import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");

import {
  ActionCreators as ArtistsActionCreators,
  Selectors as ArtistsSelectors
} from "../redux/artistsRedux";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.artists.data === null && !this.props.artists.fetching) {
      this.props.loadArtists();
    }
  }

  _handleCardPress = artistId => {
    const { loadDiscography, navigation } = this.props;
    loadDiscography(artistId);
    navigation.navigate("Discography");
  };

  rendertwitterIcon = artistTwitteUrl => {
    if (artistTwitteUrl === "") {
      return null;
    }
    const handlePress = () => {
      Linking.canOpenURL(artistTwitteUrl).then(supported => {
        if (supported) {
          Linking.openURL(artistTwitteUrl);
        } else {
          console.log("Don't know how to open URI: " + artistTwitteUrl);
        }
      });
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name="twitter" family="AntDesign" color="#1DA1F2" size={20} />
      </TouchableOpacity>
    );
  };
  renderArtist = ({ item: { artist } }) => {
    const {
      artist_name,
      artist_twitter_url,
      artist_country,
      artist_id
    } = artist;

    return (
      <TouchableOpacity onPress={() => this._handleCardPress(artist_id)}>
        <Card
          title={artist_name}
          fullBackgroundImage
          image={`https://picsum.photos/200/300?random=${artist_id}`}
          location={this.rendertwitterIcon(artist_twitter_url)}
          caption={artist_country}
          authorSubTitle="420 minutes ago"
        />
      </TouchableOpacity>
    );
  };

  renderArtists = topArtists => {
    const keyExtractor = ({ artist: { artist_id } }) => "" + artist_id;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          <FlatList
            data={topArtists}
            renderItem={this.renderArtist}
            keyExtractor={keyExtractor}
          />
        </Block>
      </ScrollView>
    );
  };

  render() {
    const { artists } = this.props;

    return (
      <Block flex center style={styles.home}>
        {artists.fetching ? (
          <ActivityIndicator
            size="large"
            color={materialTheme.COLORS.BORDER_COLOR}
          />
        ) : (
          this.renderArtists(artists.data)
        )}
      </Block>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadArtists: () => dispatch(ArtistsActionCreators.artistsRequest()),
  loadDiscography: artistId =>
    dispatch(ArtistsActionCreators.artistDiscographyRequest(artistId))
});

const mapStateToProps = state => ({
  artists: ArtistsSelectors.getArtists(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  home: {
    width: width
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300"
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2
  }
});
