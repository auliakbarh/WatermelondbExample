import React, {Component} from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-navigation';
import withObservables from '@nozbe/with-observables';

import Button from '../components/Button';
import ListItem from '../components/ListItem';
import styles from '../styles/styles';
import {extractId} from '../utils/utils';

const NastyCommentsItem = ({blog, onPress}) => (
  <ListItem
    title="Nasty comments"
    countObservable={blog.nastyComments.observeCount()}
    onPress={onPress}
  />
);

const RawPostItem = ({post, onPress}) => (
  <ListItem
    title={post.title}
    countObservable={post.comments.observeCount()}
    onPress={onPress}
  />
);

const PostItem = withObservables(['post'], ({post}) => {
  console.log('POST ==> ', post);
  return {post};
})(RawPostItem);

class Blog extends Component {
  moderate = async () => {
    await this.props.blog.moderateAll();
  };

  render() {
    const {blog, posts, navigation} = this.props;
    return (
      <FlatList
        data={posts}
        renderItem={({item: post}) => (
          <PostItem
            post={post}
            key={post.id}
            onPress={() => navigation.navigate('Post', {post})}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <Button
              style={styles.button}
              title="Moderate"
              onPress={this.moderate}
            />
            <NastyCommentsItem
              blog={blog}
              onPress={() => navigation.navigate('ModerationQueue', {blog})}
            />
            <Text style={styles.postsListHeader}>Posts: {posts.length}</Text>
          </>
        )}
        keyExtractor={extractId}
      />
    );
  }
}

const enhance = withObservables(['blog'], ({blog}) => {
  console.log('blog observe', blog.observe());
  return {blog: blog.observe(), posts: blog.posts.observe()};
});

export default enhance(Blog);
